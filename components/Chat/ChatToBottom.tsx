import React, { useEffect } from 'react';
import throttle from 'lodash.throttle';
import styles from 'components/Chat/ChatToBottom.module.css';

type ChatToBottomPropsType = {
  refElement: HTMLDivElement | null;
  scrollingTop: boolean;
  setScrollingTop: (value: boolean) => void;
};

const ChatToBottom = ({
  refElement,
  scrollingTop,
  setScrollingTop,
}: ChatToBottomPropsType) => {
  const scrollToBottom = (element: HTMLDivElement | null) => {
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (refElement) {
        const isScrolledToBottom =
          refElement.scrollHeight - refElement.clientHeight <=
          refElement.scrollTop + 100;
        if (isScrolledToBottom) {
          setScrollingTop(false);
        } else {
          setScrollingTop(true);
        }
      }
    }, 300);

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
      Wróć do najnowszych
    </div>
  );
};

export default ChatToBottom;
