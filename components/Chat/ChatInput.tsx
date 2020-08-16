import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { toggleOptions } from 'store/slices/appChat';
import { useTypedSelector } from 'store/rootReducer';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from 'components/Chat/ChatInput.module.css';
import Tooltip from '@material-ui/core/Tooltip';
import Cookies from 'js-cookie';

const ChatInput = () => {
  const poorchatClientID = 'zZ8b2kcex1VVrhtBB1a2KApZKyubeAWkpy4LARLE';
  const poorchatRedirectURL = 'http://localhost:8080/callback';
  const poorchatAuthLink = `https://poorchat.net/oauth/authorize?client_id=${poorchatClientID}&redirect_uri=${poorchatRedirectURL}&response_type=code&scope=user+user_subscriptions`;
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const poorchat = useTypedSelector((state) => state.appPoorchat);

  const onAuth = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    Cookies.set('callback_redirect', router.asPath);
    window.location.href = poorchatAuthLink;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.wrapper}>
        <div className={styles.input}>
          <input
            disabled={!poorchat.user}
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
          {!poorchat.user && (
            <button onClick={onAuth} className={styles.button}>
              Zaloguj
            </button>
          )}
          {poorchat.user && (
            <button className={styles.button} type="submit">
              Wyślij
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
