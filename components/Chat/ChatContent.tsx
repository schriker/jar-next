import React, { useEffect, useRef, useState } from 'react';
import { startPlayer } from 'store/slices/appPlayer';
import { useTypedSelector } from 'store/rootReducer';
import { useDispatch } from 'react-redux';
import { Video } from 'types/video';
import {
  ChatMessageType,
  ChatEmoticon,
  ChatModeBadge,
  ChatUserWithMode,
  ChatBadges,
} from 'types/message';
import { fetchMessages } from 'helpers/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import style from 'components/Chat/ChatContent.module.css';
import SimpleBar from 'simplebar-react';
import { API } from 'helpers/axios';
import ChatMessage from './ChatMessage';

const ChatContent = ({ video }: { video: Video }) => {
  const bottom = useRef<HTMLElement | null>(null);
  const dispatch = useDispatch();
  const workerRef = useRef<Worker>();
  const player = useTypedSelector((state) => state.appPlayer);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [chatAdjustment, setChatAdjusment] = useState<number>(0);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [modes, setModes] = useState<ChatModeBadge[]>([]);
  const [usersWithMode, setUsersWithMode] = useState<ChatUserWithMode[]>([]);
  const [badges, setBadges] = useState<ChatBadges | null>(null);
  const [emoticons, setEmoticons] = useState<ChatEmoticon[]>([]);

  useEffect(() => {
    workerRef.current = new Worker('../../helpers/message.worker.js', {
      type: 'module',
    });
    return () => {
      if (workerRef.current) {
        console.log('Terminate');
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
                setMessages((messages) => [...messages.slice(-70), data.message]);
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

  useEffect(() => {
    const fetchAllIcons = async () => {
      try {
        const jadiscoEmoticons = axios.get(
          'https://poorchat.net/api/emoticons'
        );
        const jadiscoEmoticonsPremium = axios.get(
          'https://poorchat.net/api/channels/2/emoticons'
        );

        const icons = await Promise.all([
          jadiscoEmoticons,
          jadiscoEmoticonsPremium,
        ]);

        let emoticons: ChatEmoticon[] = [];

        for (let el of icons) {
          emoticons = [...emoticons, ...el.data];
        }

        const badgesRequest = axios.get(
          'https://poorchat.net/api/channels/2/badges'
        );
        const modsRequest = axios.get('https://poorchat.net/api/badges');
        const usersWithModsRequest = API.get('/modes?streamer=wonziu');

        const [badges, mods, usersWithMods] = await Promise.all([
          badgesRequest,
          modsRequest,
          usersWithModsRequest,
        ]);

        setModes(mods.data);
        setEmoticons(emoticons);
        setBadges(badges.data);
        setUsersWithMode(usersWithMods.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllIcons();
  }, []);

  useEffect(() => {
    if (bottom.current) {
      bottom.current.scrollTop = bottom.current.scrollHeight;
    }
  }, [messages]);

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
    <div className={style.chatWrapper}>
      <SimpleBar scrollableNodeProps={{ ref: bottom }} style={{ maxHeight: '100%' }}>
        {messages.map((message) => (
          <ChatMessage
            key={`${message.uuid}`}
            badges={badges}
            modes={modes}
            message={message}
            emoticons={emoticons}
            usersWithMode={usersWithMode}
          />
        ))}
      </SimpleBar>
    </div>
  );
};

export default ChatContent;
