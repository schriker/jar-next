import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Modal from 'components/Modal/Modal';
import styles from 'components/Donate/Donate.module.css';

const COOKIE_NAME = 'donate_cookie';

const Donate = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const cookie = Cookies.get(COOKIE_NAME);
    if (!cookie) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    Cookies.set(COOKIE_NAME, '1', { expires: 365 });
  };

  return (
    <Modal isOpen={isOpen} close={handleClose}>
      {() => (
        <div className={styles.wrapper}>
          <p>
            Jeśli chcesz pomóc w utrzymaniu strony stworzyłem zrzutkę na koszt
            utrzymania domeny oraz serwera:
          </p>
          <a target="_blank" href="https://zrzutka.pl/gesz5f" rel="noreferrer">
            &laquo; link do zrzutki &raquo;
          </a>
          <p>
            Zrzutka jest tylko ekstra pomocą. Serwis będzie działać bez względu
            na to czy uda się zebrać fundusze czy nie :)
          </p>
          <button onClick={handleClose} className={styles.button}>
            Zamknij
          </button>
        </div>
      )}
    </Modal>
  );
};

export default Donate;
