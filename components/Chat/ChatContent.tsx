import React from 'react';
import { startPlayer } from 'store/slices/appPlayer';
import { useTypedSelector } from 'store/rootReducer';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import style from 'components/Chat/ChatContent.module.css';

const ChatContent = () => {
  const dispatch = useDispatch();
  const player = useTypedSelector((state) => state.appPlayer);

  return !player.startPlayer ? (
    <div className={style.playWrapper}>
      <div
        onClick={() =>
          player.isReady ? dispatch(startPlayer(true)) : null
        }
        className={style.playButton}
      >
        <div className={style.playIcon}>
          <FontAwesomeIcon icon={faPlay} />
        </div>
      </div>
    </div>
  ) : null;
};

export default ChatContent;
