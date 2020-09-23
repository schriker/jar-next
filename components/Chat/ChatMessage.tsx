import React, { useMemo } from 'react';
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
import checkContrast from 'helpers/checkContrast';

type ChatMessagePropsType = {
  message: ChatMessageType;
  emoticons: ChatEmoticon[];
  usersWithMode: ChatUserWithMode[];
  badges: ChatBadges | null;
  modes: ChatModeBadge[];
  tooltipContainer: HTMLDivElement | null;
};

type ChatMessageIconPropsType = {
  tip: string;
  source: string;
  srcset?: string;
  tooltipContainer: HTMLDivElement | null;
};

const ChatMessageIcon = ({
  tip,
  source,
  srcset = '',
  tooltipContainer,
}: ChatMessageIconPropsType) => {
  return (
    <Tooltip
      title={tip}
      placement="top"
      arrow
      PopperProps={{ container: tooltipContainer }}
    >
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
  tooltipContainer,
}: ChatMessagePropsType) => {
  const dispatch = useDispatch();
  const chat = useTypedSelector((state) => state.appChat);
  const isAction = message.body.split(' ')[0] === '\u0001ACTION';

  let nickColor = message.color ? message.color : '#FFFFFF';
  const isVisible = checkContrast(nickColor);

  if (!isVisible) {
    nickColor = '#FFFFFF';
  }

  const mode: {
    icon: string;
    srcset: string;
    name: string;
  } | null = useMemo(() => {
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
        return {
          icon: `https://static.poorchat.net/badges/${mode}/1x`,
          srcset: `https://static.poorchat.net/badges/${mode}/1x, https://static.poorchat.net/badges/${mode}/2x 1.25x, https://static.poorchat.net/badges/${mode}/4x 2.25x`,
          name: modesName[mode],
        };
      }
    }
    return null;
  }, []);

  const sub: { icon: string; srcset: string } | null = useMemo(() => {
    if (message.subscription > 0 && badges) {
      const badge = badges.subscriber.filter(
        (badge) => badge.months <= message.subscription
      );
      return {
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
      };
    }
    return null;
  }, []);

  const twitch: { icon: string; srcset: string } | null = useMemo(() => {
    if (message.type === 'TWITCH') {
      return {
        icon: `/twitch_1x.png`,
        srcset: `/twitch_1x.png, /twitch_2x.png 1.25x, /twitch_4x.png 2.25x`,
      };
    } else {
      return null;
    }
  }, []);

  const gifts: { icon: string; srcset: string } | null = useMemo(() => {
    if (message.subscriptiongifter > 0) {
      const [giftBadges] = modes.filter((mode) => mode.mode === 'g');
      if (giftBadges?.badges) {
        const badge = giftBadges.badges.filter(
          (badge) => badge.gifts <= message.subscriptiongifter
        );
        if (message.week_position && message.week_position <= 3) {
          return {
            icon: `https://static.poorchat.net/badges/top_gift_${message.week_position}/1x`,
            srcset: `https://static.poorchat.net/badges/top_gift_${message.week_position}/1x, https://static.poorchat.net/badges/top_gift_${message.week_position}/2x 1.25x, https://static.poorchat.net/badges/top_gift_${message.week_position}/4x 2.25x`,
          };
        } else {
          return {
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
          };
        }
      }
    }
    return null;
  }, []);

  let isAuhorSelected = true;
  if (chat.selectedAuthor.length && chat.selectedAuthor !== message.author) {
    isAuhorSelected = false;
  }

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (chat.selectedAuthor === message.author) {
      dispatch(setSelectedAuthor(''));
    } else {
      dispatch(setSelectedAuthor(message.author));
    }
  };

  return (
    <div>
      <div
        className={styles.wrapper}
        style={{ opacity: isAuhorSelected ? 1 : 0.25 }}
      >
        {chat.showTime && (
          <span className={styles.time}>
            {!isAction && moment(message.createdAt).format('HH:mm')}
            {isAction && '*'}
          </span>
        )}
        {!isAction && (
          <span className={styles.icons}>
            {twitch && (
              <ChatMessageIcon
                tooltipContainer={tooltipContainer}
                tip={'Twitch'}
                source={twitch.icon}
                srcset={twitch.srcset}
              />
            )}
            {mode && (
              <ChatMessageIcon
                tooltipContainer={tooltipContainer}
                tip={mode.name}
                source={mode.icon}
                srcset={mode.srcset}
              />
            )}
            {sub && (
              <ChatMessageIcon
                tooltipContainer={tooltipContainer}
                tip={`Subskrybuje: ${message.subscription}`}
                source={sub.icon}
                srcset={sub.srcset}
              />
            )}
            {gifts && (
              <ChatMessageIcon
                tooltipContainer={tooltipContainer}
                tip={`Podarował: ${message.subscriptiongifter}`}
                source={gifts.icon}
                srcset={gifts.srcset}
              />
            )}
          </span>
        )}
        <span
          onClick={handleAuthorClick}
          className={styles.author}
          style={{
            color: nickColor,
            fontStyle: isAction ? 'italic' : 'normal',
          }}
        >
          {message.author}
        </span>
        :{' '}
        {!isAction && (
          <span className={styles.message}>
            {messageParser(message.body, emoticons).map((part, index) => (
              <ChatMessageComponent
                tooltipContainer={tooltipContainer}
                key={`${message.uuid}-${index}`}
                part={part}
              />
            ))}
          </span>
        )}
        {isAction && <span className={styles.action}>{message.body}</span>}
      </div>
    </div>
  );
};

export default ChatMessage;
