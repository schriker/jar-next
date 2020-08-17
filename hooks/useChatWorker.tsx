import { useEffect, useRef, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import moment from 'moment';
import { Video } from 'types/video';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'store/rootReducer';
import { startPlayer } from 'store/slices/appPlayer';

const useChatWorker = <T extends unknown>(
  fetch: (time: string) => Promise<T[]>,
  video: Video,
  emptyMessage?: T
) => {
  const dispatch = useDispatch();
  const workerRef = useRef<Worker>();
  const [messages, setMessages] = useState<T[]>([]);
  const [startTime, setStartTime] = useState<string | null>(null);
  const player = useTypedSelector((state) => state.appPlayer);
  const [chatAdjustment, setChatAdjusment] = useState<number>(0);

  useEffect(() => {
    workerRef.current = new Worker('../helpers/message.worker.js', {
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
        const response = await fetch(startTime);
        if (response.length === 0) {
          workerRef.current.postMessage({
            type: 'STOP',
          });
          if (emptyMessage) {
            setMessages([emptyMessage]);
          }
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
    messages,
  };
};

export default useChatWorker;
