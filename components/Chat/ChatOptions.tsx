import React from 'react';
import { useTransition, animated } from 'react-spring';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'store/rootReducer';
import { toggleImage, toggleTime } from 'store/slices/appChat';
import SwitchButton from 'components/SwitchButton/SwitchButton';
import styles from 'components/Chat/ChatOptions.module.css';

const ChatOptions = () => {
  const chat = useTypedSelector((state) => state.appChat);
  const dispatch = useDispatch();
  const transitions = useTransition(chat.showOptions, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props} className={styles.wrapper}>
              <div className={styles.title}>
                <span>Ustawienia czatu</span>
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
