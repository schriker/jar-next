import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from 'helpers/axios';
import {
  ChatModeBadge,
  ChatUserWithMode,
  ChatBadges,
  ChatEmoticon,
} from 'types/message';

const useChatIconsData = () => {
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
        console.log('Icons:', error);
      }
    };
    fetchAllIcons();
  }, []);

  return {
    modes,
    usersWithMode,
    badges,
    emoticons,
  };
};

export default useChatIconsData;
