import React, { useEffect, useState, useRef } from 'react';
import { API } from 'helpers/axios';
import axios from 'axios';
import {
  ChatBadges,
  ChatEmoticon,
  ChatModeBadge,
  ChatUserWithMode,
} from 'types/message';
import { ChatMessageType } from 'types/message';
// import styles from 'components/Chat/ChatMessages.module.css';
import ChatMessage from 'components/Chat/ChatMessage';

type ChatMessagesPropsType = {
  messages: ChatMessageType[];
};

const ChatMessages = ({ messages }: ChatMessagesPropsType) => {
  const bottom = useRef(null);
  const [modes, setModes] = useState<ChatModeBadge[]>([]);
  const [usersWithMode, setUsersWithMode] = useState<ChatUserWithMode[]>([]);
  const [badges, setBadges] = useState<ChatBadges | null>(null);
  const [emoticons, setEmoticons] = useState<ChatEmoticon[]>([]);

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
  return (
    <>
      {messages.map((message, index) => (
        <ChatMessage
          key={`${message._id}-${index}`}
          badges={badges}
          modes={modes}
          message={message}
          emoticons={emoticons}
          usersWithMode={usersWithMode}
        />
      ))}
    </>
  );
};

export default ChatMessages;
