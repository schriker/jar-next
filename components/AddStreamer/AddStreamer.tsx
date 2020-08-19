import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'store/rootReducer';
import { addClientStreamer, removeClientStreamer } from 'store/slices/appData';
import { animated, useSpring } from 'react-spring';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from 'components/AddStreamer/AddStreamer.module.css';

type AddStreamerPropsType = {
  isOpen: boolean;
};

const AddStreamer = ({ isOpen }: AddStreamerPropsType) => {
  const dispatch = useDispatch();
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
      dispatch(addClientStreamer(value.toLowerCase()));
    } else if (value.length) {
      dispatch(removeClientStreamer(value.toLowerCase()));
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
      <animated.input
        style={slideIn}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Dodaj lub usuń kanał"
      />
    </form>
  );
};

export default AddStreamer;
