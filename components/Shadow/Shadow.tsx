import React from 'react';
import { useSpring, animated, useTransition } from 'react-spring';
import style from './Shadow.module.css';

type ShadowProps = {
  isOpen: boolean;
  delay?: number;
};

const Shadow = ({ isOpen, delay = 0 }: ShadowProps) => {
  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0 },
    //@ts-expect-error
    enter: () => async (next) => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      await next({ opacity: .7 });
    },
    leave: { opacity: 0 },
  });

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div className={style.shadow} key={key} style={props} />
          )
      )}
    </>
  );
};

export default Shadow;
