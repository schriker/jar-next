import React from 'react';
import { animated, useTransition } from 'react-spring';
import styles from 'components/Shadow/Shadow.module.css';

type ShadowProps = {
  isOpen: boolean;
  delay?: number;
  absolute?: boolean;
  onClick?: () => void;
};

const Shadow = ({
  isOpen,
  delay = 0,
  onClick,
  absolute = false,
}: ShadowProps) => {
  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0 },
    //@ts-expect-error
    enter: () => async (next) => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      await next({ opacity: 0.5 });
    },
    leave: { opacity: 0 },
  });

  const onClickHandler = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              onClick={() => onClickHandler()}
              className={absolute ? styles.absolute : styles.shadow}
              key={key}
              style={props}
            />
          )
      )}
    </>
  );
};

export default Shadow;
