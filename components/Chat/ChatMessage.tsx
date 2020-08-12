import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedAuthor } from 'store/slices/appChat';
import { useTypedSelector } from 'store/rootReducer';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';
import {
  ChatMessageType,
  ChatBadges,
  ChatModeBadge,
  ChatUserWithMode,
  ChatEmoticon,
} from 'types/message';
import styles from 'components/Chat/ChatMessage.module.css';
import { messageParser } from 'helpers/messageParser';
import ChatMessageComponent from 'components/Chat/ChatMessageComponent';

type ChatMessagePropsType = {
  message: ChatMessageType;
  emoticons: ChatEmoticon[];
  usersWithMode: ChatUserWithMode[];
  badges: ChatBadges | null;
  modes: ChatModeBadge[];
};

type ChatMessageIconPropsType = {
  tip: string;
  source: string;
  srcset?: string;
};

const ChatMessageIcon = ({
  tip,
  source,
  srcset = '',
}: ChatMessageIconPropsType) => {
  return (
    <Tooltip title={tip} placement="top" arrow>
      <img width="18px" height="18px" src={source} alt="" srcSet={srcset} />
    </Tooltip>
  );
};

const ChatMessage = ({
  message,
  emoticons,
  usersWithMode,
  modes,
  badges,
}: ChatMessagePropsType) => {
  const dispatch = useDispatch();
  const chat = useTypedSelector((state) => state.appChat);

  let isAuhorSelected = true;
  if (chat.selectedAuthor.length && chat.selectedAuthor !== message.author) {
    isAuhorSelected = false;
  }
  const [mode, setMode] = useState<{
    icon: string;
    srcset: string;
    name: string;
  } | null>(null);
  const [sub, setSub] = useState<{ icon: string; srcset: string } | null>(null);
  const [gifts, setGifts] = useState<{ icon: string; srcset: string } | null>(
    null
  );
  const parsedMessage = useMemo(
    () => messageParser(message.body, emoticons),
    []
  );
  useEffect(() => {
    const modesName: { [key: string]: string } = {
      a: 'Admin',
      m: 'Moderator Globalny',
      q: 'Właściciel',
      o: 'Moderator',
      h: 'Wyróżniony',
    };

    const [authorMode] = usersWithMode.filter(
      (mode) => mode.user === message.author
    );
    if (authorMode) {
      const [mode] = authorMode.mode.filter((mode) => !!modesName[mode]);
      if (mode) {
        setMode({
          icon: `https://static.poorchat.net/badges/${mode}/1x`,
          srcset: `https://static.poorchat.net/badges/${mode}/1x, https://static.poorchat.net/badges/${mode}/2x 1.25x, https://static.poorchat.net/badges/${mode}/4x 2.25x`,
          name: modesName[mode],
        });
      }
    }
    if (message.subscription > 0 && badges) {
      const badge = badges.subscriber.filter(
        (badge) => badge.months <= message.subscription
      );
      setSub({
        icon: `https://static.poorchat.net/badges/${
          badge[badge.length - 1].file
        }/1x`,
        srcset: `https://static.poorchat.net/badges/${
          badge[badge.length - 1].file
        }/1x, https://static.poorchat.net/badges/${
          badge[badge.length - 1].file
        }/2x 1.25x, https://static.poorchat.net/badges/${
          badge[badge.length - 1].file
        }/4x 2.25x`,
      });
    }
    if (message.subscriptiongifter > 0) {
      const [giftBadges] = modes.filter((mode) => mode.mode === 'g');
      if (giftBadges?.badges) {
        const badge = giftBadges.badges.filter(
          (badge) => badge.gifts <= message.subscriptiongifter
        );
        if (message.week_position && message.week_position <= 3) {
          setGifts({
            icon: `https://static.poorchat.net/badges/top_gift_${message.week_position}/1x`,
            srcset: `https://static.poorchat.net/badges/top_gift_${message.week_position}/1x, https://static.poorchat.net/badges/top_gift_${message.week_position}/2x 1.25x, https://static.poorchat.net/badges/top_gift_${message.week_position}/4x 2.25x`,
          });
        } else {
          setGifts({
            icon: `https://static.poorchat.net/badges/${
              badge[badge.length - 1].file
            }/1x`,
            srcset: `https://static.poorchat.net/badges/${
              badge[badge.length - 1].file
            }/1x, https://static.poorchat.net/badges/${
              badge[badge.length - 1].file
            }/2x 1.25x, https://static.poorchat.net/badges/${
              badge[badge.length - 1].file
            }/4x 2.25x`,
          });
        }
      }
    }
  }, []);

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (chat.selectedAuthor === message.author) {
      dispatch(setSelectedAuthor(''));
    } else {
      dispatch(setSelectedAuthor(message.author));
    }
  };

  return (
    <div
      className={styles.wrapper}
      style={{ opacity: isAuhorSelected ? 1 : 0.25 }}
    >
      {chat.showTime && (
        <span className={styles.time}>
          {moment(message.createdAt).format('HH:mm')}
        </span>
      )}
      <div className={styles.icons}>
        {mode && (
          <ChatMessageIcon
            tip={mode.name}
            source={mode.icon}
            srcset={mode.srcset}
          />
        )}
        {sub && (
          <ChatMessageIcon
            tip={`Subskrybuje: ${message.subscription}`}
            source={sub.icon}
            srcset={sub.srcset}
          />
        )}
        {gifts && (
          <ChatMessageIcon
            tip={`Podarował: ${message.subscriptiongifter}`}
            source={gifts.icon}
            srcset={gifts.srcset}
          />
        )}
      </div>
      <span
        onClick={handleAuthorClick}
        className={styles.author}
        style={{
          color: message.color ? message.color : '#fff',
        }}
      >
        {message.author}
      </span>
      <span className={styles.message}>
        :{' '}
        {parsedMessage.map((part, index) => (
          <ChatMessageComponent key={`${message.uuid}-${index}`} part={part} />
        ))}
      </span>
    </div>
  );
};

export default ChatMessage;
