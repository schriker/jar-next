import React from 'react';
import { useTransition, animated } from 'react-spring';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'store/rootReducer';
import { toggleImage, toggleTime, toggleOptions } from 'store/slices/appChat';
import SwitchButton from 'components/SwitchButton/SwitchButton';
import styles from 'components/Chat/ChatOptions.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ChatOptions = () => {
  const chat = useTypedSelector((state) => state.appChat);
  const dispatch = useDispatch();
  const transitions = useTransition(chat.showOptions, null, {
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
                <div className={styles.close} onClick={() => dispatch(toggleOptions())}>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
              <div className={styles.row}>
                <span onClick={() => dispatch(toggleTime())}>
                  Wyświetlaj czas
                </span>
                <SwitchButton
                  checked={chat.showTime}
                  onChange={() => dispatch(toggleTime())}
                />
              </div>
              <div className={styles.row}>
                <span onClick={() => dispatch(toggleImage())}>
                  Podgląd onośników
                </span>
                <SwitchButton
                  checked={chat.showImg}
                  onChange={() => dispatch(toggleImage())}
                />
              </div>
            </animated.div>
          )
      )}
    </>
  );
};

export default ChatOptions;
