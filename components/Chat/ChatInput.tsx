import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleOptions } from 'store/slices/appChat';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from 'components/Chat/ChatInput.module.css';
import Tooltip from '@material-ui/core/Tooltip';

const ChatInput = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

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
          <Tooltip title="Ustawienia" placement="top" arrow>
            <div
              onClick={() => dispatch(toggleOptions())}
              className={styles.icon}
            >
              <FontAwesomeIcon icon={faCog} />
            </div>
          </Tooltip>
          <button className={styles.button} type="submit">
            Wyślij
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
