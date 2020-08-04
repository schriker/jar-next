import React, { useEffect, useRef } from 'react';
import { startPlayer } from 'store/slices/appPlayer';
import { useTypedSelector } from 'store/rootReducer';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import style from 'components/Chat/ChatContent.module.css';

const ChatContent = () => {
  const dispatch = useDispatch();
  const player = useTypedSelector((state) => state.appPlayer);

  const workerRef = useRef<Worker>();
  useEffect(() => {
    workerRef.current = new Worker('../../helpers/message.worker.js', { type: 'module' });
    workerRef.current.onmessage = (evt) =>
      alert(`WebWorker Response => ${evt.data}`);
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  return !player.startPlayer ? (
    <div className={style.playWrapper}>
      <div
        onClick={() => (player.isReady ? dispatch(startPlayer(true)) : null)}
        className={style.playButton}
      >
        <div className={style.playIcon}>
          <FontAwesomeIcon icon={faPlay} />
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default ChatContent;
