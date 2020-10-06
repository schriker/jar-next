import React, { useRef } from 'react';
import { animated, useTransition } from 'react-spring';
import Shadow from 'components/Shadow/Shadow';
import styles from 'components/Modal/Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type ModalPropsType = {
  children: (
    tooltipContainer: React.MutableRefObject<HTMLDivElement | null>
  ) => JSX.Element;
  isOpen: boolean;
  close: () => void;
};

const Modal = ({ children, isOpen, close }: ModalPropsType) => {
  const tooltipContainer = useRef<HTMLDivElement | null>(null);
  const transition = useTransition(isOpen, null, {
    from: { opacity: 0, transform: 'translate(-50%, -70%)' },
    enter: { opacity: 1, transform: 'translate(-50%, -50%)' },
    leave: { opacity: 0, transform: 'translate(-50%, -70%)' },
  });

  return (
    <>
      <Shadow isOpen={isOpen} onClick={close} />
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              ref={tooltipContainer}
              className={styles.wrapper}
              key={key}
              style={props}
            >
              <div className={styles.close} onClick={close}>
                <FontAwesomeIcon icon={faTimes} />
              </div>
              {children(tooltipContainer)}
            </animated.div>
          )
      )}
    </>
  );
};

export default Modal;
