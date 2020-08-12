import React, { useEffect, useState, useLayoutEffect } from 'react';
import throttle from 'lodash.throttle';
import styles from 'components/Chat/ChatToBottom.module.css';
import { ChatMessageType } from 'types/message';

type ChatToBottomPropsType = {
  refElement: HTMLDivElement | null;
  messages: ChatMessageType[];
};

const ChatToBottom = ({ refElement, messages }: ChatToBottomPropsType) => {
  const [scrollingTop, setScrollingTop] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<boolean>(false);

  const scrollToBottom = (element: HTMLDivElement | null) => {
    if (element) {
      element.scrollTop = element.scrollHeight - element.clientHeight;
    }
  };

  useLayoutEffect(() => {
    if (scrollingTop) {
      setNewMessage(true);
    }
    if (!scrollingTop && refElement) {
      setTimeout(() => {
        refElement.scrollTop =
          refElement.scrollHeight - refElement.clientHeight;
      }, 0);
    }
  }, [messages]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (refElement) {
        const bottom = refElement.scrollTop + refElement.clientHeight;
        const isScrolledToBottom = bottom >= refElement.scrollHeight - 60;
        if (isScrolledToBottom) {
          setScrollingTop(false);
          setNewMessage(false);
        } else {
          setScrollingTop(true);
        }
      }
    }, 150);

    if (refElement) {
      refElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (refElement) {
        refElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [refElement]);

  return (
    <div
      style={{ display: scrollingTop && newMessage ? 'block' : 'none' }}
      className={styles.scrollDown}
      onClick={() => scrollToBottom(refElement)}
    >
      Nowe wiadomości
    </div>
  );
};

export default ChatToBottom;
