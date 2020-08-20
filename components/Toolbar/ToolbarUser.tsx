import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from 'components/Toolbar/ToolbarUser.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
const Login = dynamic(() => import('components/Login/Login'));

const ToolbarUser = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const onClick = () => {
    setOpen(true);
  };

  return (
    <>
      <div onClick={onClick} className={styles.wrapper}>
        <FontAwesomeIcon icon={faUser} />
      </div>
      <Login close={() => setOpen(false)} isOpen={isOpen} />
    </>
  );
};

export default ToolbarUser;
