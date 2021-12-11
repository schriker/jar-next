import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from 'components/AddVideo/AddVideo.module.css';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import WykopNotificationForm from './WykopNotificationForm';

const WykopNotification = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      <WykopNotificationForm isOpen={isOpen} close={() => setIsOpen(false)} />
      <div className={styles.addIcon} onClick={() => setIsOpen(true)}>
        <div>
          <FontAwesomeIcon icon={faBell} />
        </div>
      </div>
    </div>
  );
};

export default WykopNotification;
