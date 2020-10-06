import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import AddVideoForm from './AddVideoForm';
import styles from 'components/AddVideo/AddVideo.module.css';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const AddVideo = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      <AddVideoForm isOpen={isOpen} close={() => setIsOpen(false)} />
      <div className={styles.addIcon} onClick={() => setIsOpen(true)}>
        <div>
          <FontAwesomeIcon icon={faPlay} />
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
