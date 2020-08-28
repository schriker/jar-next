import { useEffect, useRef, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { Video } from 'types/video';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'store/rootReducer';
import { startPlayer } from 'store/slices/appPlayer';

type UseChatPropsType<T> = {
  fetch: (time: string | number, timestamp: number) => Promise<T[]>;
  video: Video;
  emptyMessage?: T;
  isNote?: boolean;
};

const useChatWorker = <T extends unknown>({
  fetch,
  video,
  emptyMessage,
  isNote = false,
}: UseChatPropsType<T>) => {
  const dispatch = useDispatch();
  const workerRef = useRef<Worker>();
  const [messages, setMessages] = useState<T[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string | number | null>(null);
  const player = useTypedSelector((state) => state.appPlayer);
  const [chatAdjustment, setChatAdjusment] = useState<number>(0);

  useEffect(() => {
    if (isNote) {
      workerRef.current = new Worker('../helpers/note.worker.js', {
        type: 'module',
      });
    } else {
      workerRef.current = new Worker('../helpers/message.worker.js', {
        type: 'module',
      });
    }
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

  const getMessages = async (startTime: string | number) => {
    try {
      if (workerRef.current) {
        const response = await fetch(startTime, player.playerPosition);
        if (response.length === 0) {
          workerRef.current.postMessage({
            type: 'STOP',
          });
          if (emptyMessage) {
            setMessages([emptyMessage]);
          }
        } else {
          if (!isNote && !isFetching) {
            setMessages(response.slice(0, 150));
          }
          setIsFetching(false);
          workerRef.current.postMessage({
            type: 'START',
            fetched: !isNote
              ? response.slice(150, response.length - 1)
              : response,
            messages: messages,
            startTime:
              isNote && typeof startTime === 'number'
                ? startTime * 1000
                : startTime,
            playbackRate: player.playbackRate,
          });
          workerRef.current.onmessage = ({ data }) => {
            switch (data.type) {
              case 'ADD_MESSAGE':
                setMessages((messages) => [
                  ...messages.slice(-149),
                  data.message,
                ]);
                break;
              case 'FETCH':
                setIsFetching(true);
                setStartTime(data.message.createdAt);
                break;
            }
          };
        }
      }
    } catch (err) {
      console.log('useChatWorker:', err);
    }
  };

  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({
        type: 'STOP',
      });
      if (player.isPlaying && !player.finished) {
        if (isNote) {
          setStartTime(player.playerPosition);
        } else {
          setStartTime(
            new Date(
              new Date(video.started).getTime() +
                player.playerPosition * 1000 +
                chatAdjustment * 1000
            ).toISOString()
          );
        }
      }
    }
  }, [player.isPlaying, player.playbackRate]);

  const debounceChatRestart = useCallback(
    debounce((value: number, playerPosition: number) => {
      if (isNote) {
        setStartTime(playerPosition);
      } else {
        setStartTime(
          new Date(
            new Date(video.started).getTime() +
              playerPosition * 1000 +
              value * 1000
          ).toISOString()
        );
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (player.finished && workerRef.current) {
      setMessages([]);
      dispatch(startPlayer(false));
      workerRef.current.postMessage({
        type: 'STOP',
      });
    }
  }, [player.finished]);

  const chatAdjustmentHandler = (add: boolean) => {
    setChatAdjusment((value) => {
      const timeAdjustment = add ? (value += 5) : (value -= 5);
      if (player.isPlaying) {
        debounceChatRestart(timeAdjustment, player.playerPosition);
      }
      return timeAdjustment;
    });
  };

  return {
    chatAdjustmentHandler,
    chatAdjustment,
    setMessages,
    messages,
  };
};

export default useChatWorker;
