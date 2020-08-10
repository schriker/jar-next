import React, { useEffect, useState, useRef } from 'react';
import throttle from 'lodash.throttle';
import styles from 'components/Chat/ChatToBottom.module.css';
import { ChatMessageType } from 'types/message';

type ChatToBottomPropsType = {
  refElement: HTMLDivElement | null;
  messages: ChatMessageType[];
};

const ChatToBottom = ({ refElement, messages }: ChatToBottomPropsType) => {
  const [scrollingTop, setScrollingTop] = useState<boolean>(false);

  const scrollToBottom = (element: HTMLDivElement | null) => {
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };

  useEffect(() => {
    if (refElement && !scrollingTop) {
      setTimeout(() => {
        refElement.scrollTop = refElement.scrollHeight;
      }, 0);
    }
  }, [messages]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (refElement) {
        const isScrolledToBottom =
          refElement.scrollHeight - refElement.clientHeight <=
          refElement.scrollTop + 200;
        if (isScrolledToBottom) {
          setScrollingTop(false);
        } else {
          setScrollingTop(true);
        }
      }
    }, 50);

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
      style={{ display: scrollingTop ? 'block' : 'none' }}
      className={styles.scrollDown}
      onClick={() => scrollToBottom(refElement)}
    >
      {/* <span onClick={() => scrollToBottom(refElement)}>Wróć do najnowszych</span> */}
      Wróć do najnowszych
    </div>
  );
};

export default ChatToBottom;
