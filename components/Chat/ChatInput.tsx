import React, { useState } from 'react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from 'components/Chat/ChatInput.module.css';

const ChatInput = () => {
  const [value, setValue] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.wrapper}>
        <div className={styles.input}>
          <input
            value={value}
            placeholder="Treść wiadomości"
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <div className={styles.bottom}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faCog} />
          </div>
          <button className={styles.button} type="submit">
            Wyślij
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
