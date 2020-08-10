import React from 'react';
import styles from 'components/Chat/ChatCard.module.css';
import { ChatMessageType } from 'types/message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

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
  let card: ChatCardType | null = null;
  if (message.type === 'EMBED') {
    try {
      card = JSON.parse(message.body);
    } catch (err) {
      card = null;
    }
  }

  const scrollToBottom = () => {
    if (refElement) {
      refElement.scrollTop = refElement.scrollHeight;
    }
  };

  if (card) {
    if (card.image || card.type === 'gifv' || card.type === 'video') {
      content = (
        <div>
          <div className={styles.provider}>{card.provider}</div>
          <a href={card.url} target="_blank">
            {card.title && <div className={styles.title}>{card.title}</div>}
            <div className={styles.content}>
              <div className={styles.open}>
                <div className={styles.openIcon}>
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </div>
              </div>
              {card.type === 'gifv' && (
                <video
                  onLoad={scrollToBottom}
                  muted
                  autoPlay
                  loop
                  src={ card.video[0].url}
                ></video>
              )}
              {card.type === 'video' && (
                <video
                  onLoad={scrollToBottom}
                  muted
                  autoPlay
                  loop
                  src={card.url}
                ></video>
              )}
              {card.image && (
                <img
                  onLoad={scrollToBottom}
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
          <a href={card.url} target="_blank">
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
    <div
      style={{ borderColor: card ? card.color : '' }}
      className={styles.wrapper}
    >
      {message.type === 'NOTICE'
        ? message.body
        : message.type === 'EMBED'
        ? content
        : null}
    </div>
  );
};

export default ChatCard;
