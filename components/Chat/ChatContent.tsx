import React, { useEffect, useRef, useState } from 'react';
import { startPlayer } from 'store/slices/appPlayer';
import { useTypedSelector } from 'store/rootReducer';
import { useDispatch } from 'react-redux';
import { Video } from 'types/video';
import { ChatMessage } from 'types/message';
import { fetchMessages } from 'helpers/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import style from 'components/Chat/ChatContent.module.css';

const ChatContent = ({ video }: { video: Video }) => {
  const dispatch = useDispatch();
  const workerRef = useRef<Worker>();
  const player = useTypedSelector((state) => state.appPlayer);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [chatAdjustment, setChatAdjusment] = useState<number>(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    workerRef.current = new Worker('../../helpers/message.worker.js', {
      type: 'module',
    });
    return () => {
      if (workerRef.current) workerRef.current.terminate();
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
                setMessages((messages) => [...messages, data.message]);
                break;
              case 'FETCH':
                setStartTime(messages[messages.length - 1].createdAt);
                break;
              case 'SPLICE': {
                setMessages(data.messages);
              }
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
  }, [player.finished])

  console.log(messages);

  return !player.startPlayer ? (
    <div className={style.playWrapper}>
      <div
        onClick={() => (player.isReady ? dispatch(startPlayer(true)) : null)}
        className={style.playButton}
      >
        <div className={style.playIcon}>
          <FontAwesomeIcon icon={faPlay} />
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default ChatContent;
