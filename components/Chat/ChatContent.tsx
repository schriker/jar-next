import React, { useEffect, useRef, useState, useCallback } from 'react';
import { startPlayer } from 'store/slices/appPlayer';
import { setSelectedAuthor } from 'store/slices/appChat';
import { useTypedSelector } from 'store/rootReducer';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import moment from 'moment';
import { Video } from 'types/video';
import { ChatMessageType } from 'types/message';
import { fetchMessages } from 'helpers/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from 'components/Chat/ChatContent.module.css';
import SimpleBar from 'simplebar-react';
import ChatMessage from 'components/Chat/ChatMessage';
import ChatCard from 'components/Chat/ChatCard';
import useChatIconsData from 'hooks/useChatIconsData';
import ChatToBottom from 'components/Chat/ChatToBottom';
import ControllButton from 'components/ControllButton/ControllButton';

const ChatContent = ({ video }: { video: Video }) => {
  const dispatch = useDispatch();
  const workerRef = useRef<Worker>();
  const bottom = useRef<HTMLDivElement | null>(null);
  const player = useTypedSelector((state) => state.appPlayer);
  const chat = useTypedSelector((state) => state.appChat);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [chatAdjustment, setChatAdjusment] = useState<number>(0);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const { modes, usersWithMode, badges, emoticons } = useChatIconsData();

  useEffect(() => {
    workerRef.current = new Worker('../../helpers/message.worker.js', {
      type: 'module',
    });
    return () => {
      setMessages([]);
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  useEffect(() => {
    if (startTime) {
      getMessages(startTime);
    }
  }, [startTime]);

  const getMessages = async (startTime: string) => {
    try {
      if (workerRef.current) {
        const response = await fetchMessages({
          gt: startTime,
          lt: video.createdAt || moment().utc().format(),
          streamer: 'wonziu',
        });
        if (response.length === 0) {
          workerRef.current.postMessage({
            type: 'STOP',
          });
          setMessages([
            {
              uuid: '1',
              _id: '1',
              type: 'NOTICE',
              author: 'irc.poorchat.net',
              body: 'Nie posiadamy zapisu wiadomości dla tego vod.',
              color: '',
              subscription: 0,
              subscriptiongifter: 0,
              createdAt: startTime,
            },
          ]);
        } else {
          workerRef.current.postMessage({
            type: 'START',
            fetched: response,
            messages: messages,
            startTime: startTime,
            playbackRate: player.playbackRate,
          });
          workerRef.current.onmessage = ({ data }) => {
            switch (data.type) {
              case 'ADD_MESSAGE':
                setMessages((messages) => [
                  ...messages.slice(-69),
                  data.message,
                ]);
                break;
              case 'FETCH':
                setStartTime(data.message.createdAt);
                break;
            }
          };
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({
        type: 'STOP',
      });
      if (player.isPlaying && !player.finished) {
        setStartTime(
          new Date(
            new Date(video.started).getTime() +
              player.playerPosition * 1000 +
              chatAdjustment * 1000
          ).toISOString()
        );
      }
    }
  }, [player.isPlaying, player.playbackRate]);

  useEffect(() => {
    if (player.finished && workerRef.current) {
      setMessages([]);
      dispatch(startPlayer(false));
      workerRef.current.postMessage({
        type: 'STOP',
      });
    }
  }, [player.finished]);

  const debounceChatRestart = useCallback(
    debounce((value: number, playerPosition: number) => {
      setStartTime(
        new Date(
          new Date(video.started).getTime() +
            playerPosition * 1000 +
            value * 1000
        ).toISOString()
      );
    }, 500),
    []
  );

  const chatAdjustmentHandler = (add: boolean) => {
    setChatAdjusment((value) => {
      const timeAdjustment = add ? (value += 5) : (value -= 5);
      if (player.isPlaying) {
        debounceChatRestart(timeAdjustment, player.playerPosition);
      }
      return timeAdjustment;
    });
  };

  return (
    <>
      <div className={styles.adjustment}>
        <ControllButton
          onClick={() => chatAdjustmentHandler(false)}
          tooltip="Cofnij"
        >
          <div>
            <FontAwesomeIcon icon={faMinus} />
          </div>
        </ControllButton>
        <span>{chatAdjustment}s</span>
        <ControllButton
          onClick={() => chatAdjustmentHandler(true)}
          tooltip="Do przodu"
        >
          <div>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </ControllButton>
      </div>
      {!player.isPlaying && !player.startPlayer && messages.length === 0 ? (
        <div className={styles.playWrapper}>
          <div
            onClick={() =>
              player.isReady ? dispatch(startPlayer(true)) : null
            }
            className={styles.playButton}
          >
            <div className={styles.playIcon}>
              <FontAwesomeIcon icon={faPlay} />
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => dispatch(setSelectedAuthor(''))}
          className={styles.chatWrapper}
        >
          <SimpleBar
            scrollableNodeProps={{ ref: bottom }}
            style={{ height: '100%', overflowX: 'hidden' }}
            autoHide={true}
          >
            <div className={styles.chatContent}>
              {messages.map((message) =>
                message.author === 'irc.poorchat.net' && chat.showImg ? (
                  <ChatCard
                    refElement={bottom.current}
                    key={message.uuid}
                    message={message}
                  />
                ) : message.author !== 'irc.poorchat.net' ? (
                  <ChatMessage
                    key={message.uuid}
                    badges={badges}
                    modes={modes}
                    message={message}
                    emoticons={emoticons}
                    usersWithMode={usersWithMode}
                  />
                ) : null
              )}
            </div>
          </SimpleBar>
          <ChatToBottom refElement={bottom.current} messages={messages} />
        </div>
      )}
    </>
  );
};

export default ChatContent;
