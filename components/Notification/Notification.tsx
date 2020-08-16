import React, { useEffect } from 'react';
import Shadow from 'components/Shadow/Shadow';
import styles from 'components/Notification/Notification.module.css';
import { animated, useTransition } from 'react-spring';
import { clearNotification } from 'store/slices/appNotification';
import { useTypedSelector } from 'store/rootReducer';
import { useDispatch } from 'react-redux';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useTypedSelector((state) => state.appNotification);
  const transitions = useTransition(notification.isOpen, null, {
    from: { bottom: -100 },
    enter: { bottom: 150 },
    leave: { bottom: -100 },
  });
  
  useEffect(() => {
    let timeOut: number;
    if (notification.isOpen) {
      timeOut = setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [notification.message]);

  return (
    <>
      <Shadow
        isOpen={notification.isOpen}
        onClick={() => dispatch(clearNotification())}
      />
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              className={styles.notification}
              key={key}
              style={props}
            >
              {notification.message}
            </animated.div>
          )
      )}
    </>
  );
};

export default Notification;
