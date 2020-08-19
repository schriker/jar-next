import React, { useRef } from 'react';
import useChatWorker from 'hooks/useChatWorker';
import { startPlayer } from 'store/slices/appPlayer';
import { setSelectedAuthor } from 'store/slices/appChat';
import { useTypedSelector } from 'store/rootReducer';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Video } from 'types/video';
import {
  ChatMessageType,
  ChatEmoticon,
  ChatUserWithMode,
  ChatBadges,
  ChatModeBadge,
} from 'types/message';
import { fetchMessages } from 'helpers/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from 'components/Chat/ChatContent.module.css';
import SimpleBar from 'simplebar-react';
import ChatMessage from 'components/Chat/ChatMessage';
import ChatCard from 'components/Chat/ChatCard';
import ChatToBottom from 'components/Chat/ChatToBottom';
import ControllButton from 'components/ControllButton/ControllButton';

type ChatContentPropsType = {
  video: Video;
  emoticons: ChatEmoticon[];
  usersWithMode: ChatUserWithMode[];
  badges: ChatBadges | null;
  modes: ChatModeBadge[];
};

const ChatContent = ({
  video,
  emoticons,
  usersWithMode,
  badges,
  modes,
}: ChatContentPropsType) => {
  const fetch = (startTime: string | number) => {
    return fetchMessages({
      gt: startTime.toString(),
      lt: video.createdAt || moment().utc().format(),
      streamer: 'wonziu',
    });
  };

  const emptyMessage = {
    uuid: '1',
    _id: '1',
    type: 'NOTICE',
    author: 'irc.poorchat.net',
    body: 'Nie posiadamy zapisu wiadomości dla tego vod.',
    color: '',
    subscription: 0,
    subscriptiongifter: 0,
    createdAt: video.started,
  };

  const dispatch = useDispatch();
  const { chatAdjustment, messages, chatAdjustmentHandler } = useChatWorker<
    ChatMessageType
  >({ fetch, video, emptyMessage });
  const bottom = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const player = useTypedSelector((state) => state.appPlayer);
  const chat = useTypedSelector((state) => state.appChat);

  return (
    <>
      <div className={styles.adjustment}>
        <ControllButton
          onClick={() => chatAdjustmentHandler(false)}
          tooltip="Cofnij"
        >
          <div>
            <FontAwesomeIcon icon={faMinus} />
          </div>
        </ControllButton>
        <span>{chatAdjustment}s</span>
        <ControllButton
          onClick={() => chatAdjustmentHandler(true)}
          tooltip="Do przodu"
        >
          <div>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </ControllButton>
      </div>
      {!player.isPlaying && !player.startPlayer && messages.length === 0 ? (
        <div className={styles.playWrapper}>
          <div
            onClick={() =>
              player.isReady ? dispatch(startPlayer(true)) : null
            }
            className={styles.playButton}
          >
            <div className={styles.playIcon}>
              <FontAwesomeIcon icon={faPlay} />
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => dispatch(setSelectedAuthor(''))}
          className={styles.chatWrapper}
          ref={ref}
        >
          <SimpleBar
            scrollableNodeProps={{ ref: bottom }}
            style={{ height: '100%', overflowX: 'hidden' }}
            autoHide={true}
          >
            <div className={styles.chatContent}>
              {messages.map((message) =>
                message.author === 'irc.poorchat.net' && chat.showImg ? (
                  <ChatCard
                    refElement={bottom.current}
                    key={message.uuid}
                    message={message}
                  />
                ) : message.author !== 'irc.poorchat.net' ? (
                  <ChatMessage
                    key={message.uuid}
                    badges={badges}
                    modes={modes}
                    message={message}
                    emoticons={emoticons}
                    tooltipContainer={ref.current}
                    usersWithMode={usersWithMode}
                  />
                ) : null
              )}
            </div>
          </SimpleBar>
          <ChatToBottom refElement={bottom.current} messages={messages} />
        </div>
      )}
    </>
  );
};

export default ChatContent;
