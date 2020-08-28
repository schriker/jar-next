import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'store/rootReducer';
import { addStreamer, setIsFetching } from 'store/slices/appData';
import { animated, useSpring } from 'react-spring';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from 'components/AddStreamer/AddStreamer.module.css';

type AddStreamerPropsType = {
  isOpen: boolean;
  open: (value: boolean) => void;
};

const AddStreamer = ({ isOpen, open }: AddStreamerPropsType) => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const state = useTypedSelector((state) => state.appData);
  const [value, setValue] = useState<string>('');
  const slideIn = useSpring({
    opacity: isOpen ? 1 : 0,
    config: {
      duration: 200,
    },
  });

  const onSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      value.length &&
      !state.client.streamers.includes(value.toLowerCase()) &&
      !state.server.streamers.includes(value.toLowerCase())
    ) {
      dispatch(setIsFetching(true));
      dispatch(addStreamer([...state.client.streamers, value.toLowerCase()]));
    } else {
      open(true);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
    setValue('');
  };

  return (
    <form onSubmit={onSumbit} className={styles.wrapper}>
      <button className={styles.addIcon} type="submit">
        <div>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </button>
      <animated.div style={slideIn} className={styles.inputWrapper}>
        <input
          ref={inputRef}
          disabled={state.client.isFetching}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Dodaj kanał"
        />
      </animated.div>
    </form>
  );
};

export default AddStreamer;
