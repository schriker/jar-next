import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import NewVideoForm from './NewVideoForm';
import styles from 'components/NewVideo/NewVideo.module.css';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const NewVideo = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      <NewVideoForm isOpen={isOpen} close={() => setIsOpen(false)} />
      <div className={styles.addIcon} onClick={() => setIsOpen(true)}>
        <div>
          <FontAwesomeIcon icon={faArrowUp} />
        </div>
      </div>
    </div>
  );
};

export default NewVideo;
