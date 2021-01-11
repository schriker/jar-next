import React, { useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import useOnClickOutside from 'use-onclickoutside';
import Shadow from 'components/Shadow/Shadow';
import styles from 'components/Dropdown/Dropdown.module.css';

type DropdownPropsType = {
  close: () => void;
  isOpen: boolean;
  children: JSX.Element[] | JSX.Element;
};

const Dropdown = ({ close, isOpen, children }: DropdownPropsType) => {
  const ref = useRef(null);
  const transitions = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useOnClickOutside(ref, close);

  return (
    <>
      <Shadow isOpen={isOpen} />
      {transitions(
        (style, item) =>
          item && (
            <animated.div ref={ref} style={style as any} className={styles.wrapper}>
              {children}
            </animated.div>
          )
      )}
    </>
  );
};

export default Dropdown;
