import React, { useRef } from 'react';
import Modal from 'components/Modal/Modal';
import { useRouter } from 'next/router';
import { useTypedSelector } from 'store/rootReducer';
import styles from 'components/ShareVideo/ShareVideoForm.module.css';

type ShareVideoFormPropsType = {
  isOpen: boolean;
  close: () => void;
};

const ShareVideoForm = ({ isOpen, close }: ShareVideoFormPropsType) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const state = useTypedSelector((state) => state);

  const copyLink = () => {
    inputRef.current?.select();
    document.execCommand('copy');
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      {() => (
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.row}>
              <label htmlFor="">Udostępnij</label>
              <input
                readOnly
                ref={inputRef}
                value={`https://jarchiwum.pl${
                  router.asPath.split('?')[0]
                }?t=${Math.round(state.appPlayer.playerPosition)}`}
              />
            </div>
            <div>
              <button onClick={copyLink} className={styles.shareCopyButton}>
                Kopiuj
              </button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default ShareVideoForm;
