import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { appFirebaseSignOut } from 'store/slices/appFirebase';
import dynamic from 'next/dynamic';
import { useTypedSelector } from 'store/rootReducer';
import styles from 'components/Toolbar/ToolbarUser.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
const Login = dynamic(() => import('components/Login/Login'));

const ToolbarUser = () => {
  const dispatch = useDispatch();
  const appFirebase = useTypedSelector((state) => state.appFirebase);
  const [isOpen, setOpen] = useState<boolean>(false);
  const onClick = () => {
    setOpen(true);
  };

  return (
    <>
      {appFirebase.uid ? (
        <div
          onClick={() => dispatch(appFirebaseSignOut())}
          className={styles.wrapper}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
        </div>
      ) : (
        <div onClick={onClick} className={styles.wrapper}>
          <FontAwesomeIcon icon={faUser} />
        </div>
      )}
      <Login close={() => setOpen(false)} isOpen={isOpen} />
    </>
  );
};

export default ToolbarUser;
