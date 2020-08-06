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
};

const ChatMessageIcon = ({ id, tip, source }: ChatMessageIconPropsType) => {
  return (
    <>
      <img
        width="18px"
        height="18px"
        data-tip={tip}
        data-for={id}
        src={source}
        alt=""
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
  const [mode, setMode] = useState<{ icon: string; name: string } | null>(null);
  const [sub, setSub] = useState<string | null>(null);
  const [gifts, setGifts] = useState<string | null>(null);
  const id = useMemo(() => uuidv4(), []);
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
          icon: `https://static.poorchat.net/badges/${mode}/2x`,
          name: modesName[mode],
        });
      }
    }
    if (message.subscription > 0 && badges) {
      const badge = badges.subscriber.filter(
        (badge) => badge.months <= message.subscription
      );
      setSub(
        `https://static.poorchat.net/badges/${badge[badge.length - 1].file}/2x`
      );
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
    console.log('Render');
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
          />
        )}
        {sub && (
          <ChatMessageIcon
            tip={`Subskrybuje: ${message.subscription}`}
            id={`sub-${id}`}
            source={sub}
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
          <ChatMessageComponent key={`${message._id}-${index}`} part={part} />
        ))}
      </span>
    </div>
  );
};

export default ChatMessage;
