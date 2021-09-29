import React, { useRef } from 'react';
import { useTypedSelector } from 'store/rootReducer';
import styles from 'components/Chat/ChatCard.module.css';
import { ChatMessageType } from 'types/message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
import { messageParser } from 'helpers/messageParser';
import ChatMessageComponent from './ChatMessageComponent';
import { useDispatch } from 'react-redux';
import { setSelectedAuthor } from 'store/slices/appChat';

type ChatCardType = {
  color: string;
  title: string;
  url: string;
  provider: string;
  image: [
    {
      url: string;
    }
  ];
  type: string;
  video: {
    url: string;
  }[];
  description: string;
};

type ChatCardPropsType = {
  message: ChatMessageType;
  refElement: HTMLDivElement | null;
};

const ChatCard = ({ message, refElement }: ChatCardPropsType) => {
  let content = null;
  const dispatch = useDispatch();
  let card: ChatCardType | null = null;
  const chat = useTypedSelector((state) => state.appChat);
  const [inViewRef, inView] = useInView();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleAuthorClick = (e: React.MouseEvent, author: string) => {
    e.stopPropagation();
    if (chat.selectedAuthor === author) {
      dispatch(setSelectedAuthor(''));
    } else {
      dispatch(setSelectedAuthor(author));
    }
  };

  if (videoRef.current) {
    if (!inView) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }

  if (message.type === 'EMBED') {
    try {
      card = JSON.parse(message.body);
    } catch (err) {
      card = null;
    }
  }

  if (card) {
    if (card.image || card.type === 'gifv' || card.type === 'video') {
      content = (
        <div ref={inViewRef}>
          <div className={styles.provider}>{card.provider}</div>
          <a href={card.url} target="_blank" rel="noreferrer">
            {card.title && <div className={styles.title}>{card.title}</div>}
            <div className={styles.content}>
              <div className={styles.open}>
                <div className={styles.openIcon}>
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </div>
              </div>
              {card.type === 'gifv' && (
                <video
                  ref={videoRef}
                  muted
                  autoPlay
                  loop
                  src={card.video[0].url}
                ></video>
              )}
              {card.type === 'video' && (
                <video
                  ref={videoRef}
                  muted
                  autoPlay
                  loop
                  src={card.url}
                ></video>
              )}
              {card.image && (
                <img
                  src={card.image[card.image.length - 1].url}
                  alt={card.title}
                />
              )}
            </div>
            {card.description && (
              <div className={styles.description}>{card.description}</div>
            )}
          </a>
        </div>
      );
    } else {
      content = (
        <div>
          <div className={styles.provider}>{card.provider}</div>
          <a href={card.url} target="_blank" rel="noreferrer">
            {card.title && <div className={styles.title}>{card.title}</div>}
            {card.description && (
              <div className={styles.description}>{card.description}</div>
            )}
          </a>
        </div>
      );
    }
  }

  return (
    <div>
      <div
        style={{
          borderColor: card ? card.color : '',
          opacity: chat.selectedAuthor.length ? 0.25 : 1,
        }}
        className={styles.wrapper}
      >
        {message.type === 'NOTICE'
          ? messageParser(message.body, [], chat.chatUsers).map(
              (part, index) => (
                <ChatMessageComponent
                  handleAuthorClick={handleAuthorClick}
                  tooltipContainer={null}
                  key={`${message.uuid}-${index}`}
                  part={part}
                />
              )
            )
          : message.type === 'EMBED'
          ? content
          : null}
      </div>
    </div>
  );
};

export default ChatCard;
