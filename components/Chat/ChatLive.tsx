import React from 'react';
import styles from 'components/Chat/ChatLive.module.css';

const ChatLive = () => {
  return (
    <div className={styles.wrapper}>
      <iframe src="https://poorchat.net/channels/jadisco" width="100%" height="100%" frameBorder="0"></iframe>
    </div>
  );
};

export default ChatLive;