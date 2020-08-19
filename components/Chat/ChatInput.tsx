import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { toggleOptions, setUserNote } from 'store/slices/appChat';
import { useTypedSelector } from 'store/rootReducer';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setNotification } from 'store/slices/appNotification';
import styles from 'components/Chat/ChatInput.module.css';
import Tooltip from '@material-ui/core/Tooltip';
import Cookies from 'js-cookie';
import { postNote } from 'helpers/api';
import { ChatEmoticon } from 'types/message';

type ChatInputPropsType = {
  video: string;
  emoticons: ChatEmoticon[];
};

const ChatInput = ({ video, emoticons }: ChatInputPropsType) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const poorchatClientID = 'zZ8b2kcex1VVrhtBB1a2KApZKyubeAWkpy4LARLE';
  const poorchatRedirectURL = 'http://localhost:8080/callback';
  const poorchatAuthLink = `https://poorchat.net/oauth/authorize?client_id=${poorchatClientID}&redirect_uri=${poorchatRedirectURL}&response_type=code&scope=user+user_subscriptions`;
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const state = useTypedSelector((state) => state);

  const onAuth = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    Cookies.set('callback_redirect', router.asPath);
    window.location.href = poorchatAuthLink;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim().length > 120 || value.trim().length === 0) return;
    try {
      const response = await postNote({
        body: value,
        streamer: 'wonziu',
        timestamp: state.appPlayer.playerPosition,
        video: video,
      });
      setValue('');
      dispatch(setUserNote(response));
    } catch (err) {
      if (err.response.status === 429) {
        dispatch(setNotification('Musisz odczekać 10s'));
      } else {
        dispatch(setNotification('Błąd wysyłania wiadomości.'));
      }
    }
  };

  const [lastWord, setLastWord] = useState<string>('');
  const [matchIndex, setMatchIndex] = useState<number>(0);

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode !== 9) {
      const word = value.split(' ').pop();
      if (word) {
        setLastWord(word);
      }
      setMatchIndex(0);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 9) {
      event.preventDefault();
      if (lastWord.length >= 2) {
        const regex = new RegExp(`^${lastWord.toLowerCase()}`);
        const matchedEmoticons = emoticons.filter((el) =>
        regex.test(el.name.toLowerCase())
        );
        if (matchedEmoticons.length > 0) {
          const words = value.split(' ');
          words[words.length - 1] = matchedEmoticons[matchIndex].name;
          setValue(words.join(' '));
          if (matchIndex >= matchedEmoticons.length - 1) {
            setMatchIndex(0);
          } else {
            setMatchIndex((index) => index + 1);
          }
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setUserNote(null));
    };
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <div ref={ref} className={styles.wrapper}>
        <div className={styles.input}>
          <input
            maxLength={120}
            disabled={!state.appPoorchat.user}
            value={value}
            placeholder="Treść wiadomości"
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <div className={styles.bottom}>
          <Tooltip PopperProps={{ container: ref.current }} title="Ustawienia" placement="top" arrow>
            <div
              onClick={() => dispatch(toggleOptions())}
              className={styles.icon}
            >
              <FontAwesomeIcon icon={faCog} />
            </div>
          </Tooltip>
          {!state.appPoorchat.user && (
            <button onClick={onAuth} className={styles.button}>
              Zaloguj
            </button>
          )}
          {state.appPoorchat.user && (
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
