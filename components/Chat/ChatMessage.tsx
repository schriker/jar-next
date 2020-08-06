import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import Tooltlip from 'components/Tooltip/Tooltip';
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
import { v4 as uuidv4 } from 'uuid';

type ChatMessagePropsType = {
  message: ChatMessageType;
  emoticons: ChatEmoticon[];
  usersWithMode: ChatUserWithMode[];
  badges: ChatBadges | null;
  modes: ChatModeBadge[];
};

type ChatMessageIconPropsType = {
  id: string;
  tip: string;
  source: string;
  srcset?: string;
};

const ChatMessageIcon = ({
  id,
  tip,
  source,
  srcset = '',
}: ChatMessageIconPropsType) => {
  return (
    <>
      <img
        width="18px"
        height="18px"
        data-tip={tip}
        data-for={id}
        src={source}
        alt=""
        srcSet={srcset}
      />
      <Tooltlip id={id} />
    </>
  );
};

const ChatMessage = ({
  message,
  emoticons,
  usersWithMode,
  modes,
  badges,
}: ChatMessagePropsType) => {
  const [mode, setMode] = useState<{
    icon: string;
    srcset: string;
    name: string;
  } | null>(null);
  const [sub, setSub] = useState<{ icon: string; srcset: string } | null>(null);
  const [gifts, setGifts] = useState<string | null>(null);
  const id = uuidv4();
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
      if (giftBadges.badges) {
        const badge = giftBadges.badges.filter(
          (badge) => badge.gifts <= message.subscriptiongifter
        );
        setGifts(
          `https://static.poorchat.net/badges/${
            badge[badge.length - 1].file
          }/2x`
        );
      }
    }
  }, []);
  return (
    <div className={styles.wrapper}>
      <span className={styles.time}>
        {moment(message.createdAt).format('HH:mm')}
      </span>
      <div className={styles.icons}>
        {mode && (
          <ChatMessageIcon
            tip={mode.name}
            id={`mode-${id}`}
            source={mode.icon}
            srcset={mode.srcset}
          />
        )}
        {sub && (
          <ChatMessageIcon
            tip={`Subskrybuje: ${message.subscription}`}
            id={`sub-${id}`}
            source={sub.icon}
            srcset={sub.srcset}
          />
        )}
        {gifts && (
          <ChatMessageIcon
            tip={`Podarował: ${message.subscriptiongifter}`}
            id={`gift-${id}`}
            source={gifts}
          />
        )}
      </div>
      <span
        style={{
          color: message.color ? message.color : '#fff',
          fontWeight: 500,
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
