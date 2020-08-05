import React from 'react';
import styles from 'components/Chat/Chat.module.css';
import { Video } from 'types/video';
import ChatInput from 'components/Chat/ChatInput';
import ChatContent from 'components/Chat/ChatContent';

type ChatPropsType = {
  video: Video;
};

const Chat = ({ video }: ChatPropsType) => {
  return (
    <div className={styles.wrapper}>
      <ChatContent video={video} />
      <ChatInput />
    </div>
  );
};

export default Chat;
