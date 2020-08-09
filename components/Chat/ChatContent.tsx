import React, { useEffect, useRef, useState } from 'react';
import { startPlayer } from 'store/slices/appPlayer';
import { useTypedSelector } from 'store/rootReducer';
import { useDispatch } from 'react-redux';
import { Video } from 'types/video';
import { ChatMessageType } from 'types/message';
import { fetchMessages } from 'helpers/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import styles from 'components/Chat/ChatContent.module.css';
import SimpleBar from 'simplebar-react';
import ChatMessage from 'components/Chat/ChatMessage';
import ChatCard from 'components/Chat/ChatCard';
import useChatIconsData from 'hooks/useChatIconsData';
import ChatToBottom from 'components/Chat/ChatToBottom';

const ChatContent = ({ video }: { video: Video }) => {
  const bottom = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const workerRef = useRef<Worker>();
  const player = useTypedSelector((state) => state.appPlayer);
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
      if (video.createdAt && workerRef.current) {
        const response = await fetchMessages({
          gt: startTime,
          lt: video.createdAt,
          streamer: 'wonziu',
        });
        if (response.length === 0) {
          workerRef.current.postMessage({
            type: 'STOP',
          });
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
                  ...messages.slice(-49),
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

  return !player.startPlayer ? (
    <div className={styles.playWrapper}>
      <div
        onClick={() => (player.isReady ? dispatch(startPlayer(true)) : null)}
        className={styles.playButton}
      >
        <div className={styles.playIcon}>
          <FontAwesomeIcon icon={faPlay} />
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.chatWrapper}>
      <SimpleBar
        scrollableNodeProps={{ ref: bottom }}
        style={{ maxHeight: '100%' }}
        autoHide={true}
      >
        {messages.map((message) =>
          message.author === 'irc.poorchat.net' ? (
            <ChatCard key={message.uuid} message={message} />
          ) : (
            <ChatMessage
              key={message.uuid}
              badges={badges}
              modes={modes}
              message={message}
              emoticons={emoticons}
              usersWithMode={usersWithMode}
            />
          )
        )}
      </SimpleBar>
      <ChatToBottom refElement={bottom.current} messages={messages} />
    </div>
  );
};

export default ChatContent;
