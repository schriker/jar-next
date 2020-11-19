import React from 'react';
import { useTransition, animated } from 'react-spring';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'store/rootReducer';
import { toggleImage, toggleTime, toggleOptions } from 'store/slices/appChat';
import { logoutPoorchatUser } from 'store/slices/appPoorchat';
import SwitchButton from 'components/SwitchButton/SwitchButton';
import styles from 'components/Chat/ChatOptions.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type ChatOptionsPropsType = {
  setIsLiveChat: (isLiveChat: boolean) => void;
  isLiveCaht: boolean;
};

const ChatOptions = ({ setIsLiveChat, isLiveCaht }: ChatOptionsPropsType) => {
  const state = useTypedSelector((state) => state);
  const dispatch = useDispatch();
  const transitions = useTransition(state.appChat.showOptions, null, {
    from: { opacity: 0, transform: 'translate(0, -60%)' },
    enter: { opacity: 1, transform: 'translate(0, -50%)' },
    leave: { opacity: 0, transform: 'translate(0, -60%)' },
  });

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props} className={styles.wrapper}>
              <div className={styles.title}>
                <span>Ustawienia czatu</span>
                <div
                  className={styles.close}
                  onClick={() => dispatch(toggleOptions())}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
              <div className={styles.row}>
                <span onClick={() => dispatch(toggleTime())}>
                  Wyświetlaj czas
                </span>
                <SwitchButton
                  checked={state.appChat.showTime}
                  onChange={() => dispatch(toggleTime())}
                />
              </div>
              <div className={styles.row}>
                <span onClick={() => dispatch(toggleImage())}>
                  Podgląd odnośników
                </span>
                <SwitchButton
                  checked={state.appChat.showImg}
                  onChange={() => dispatch(toggleImage())}
                />
              </div>
              <div className={styles.row}>
                <span onClick={() => dispatch(toggleImage())}>
                  Czat na żywo
                </span>
                <SwitchButton
                  checked={isLiveCaht}
                  onChange={() => setIsLiveChat(!isLiveCaht)}
                />
              </div>
              {state.appPoorchat.user && (
                <div className={styles.row}>
                  <button
                    className={styles.button}
                    onClick={() => dispatch(logoutPoorchatUser())}
                  >
                    Wyloguj
                  </button>
                </div>
              )}
            </animated.div>
          )
      )}
    </>
  );
};

export default ChatOptions;
