import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setNotification } from 'store/slices/appNotification';
import { animated, useTransition } from 'react-spring';
import Shadow from 'components/Shadow/Shadow';
import styles from 'components/Login/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import LoginFormInput from 'components/Login/LoginFormInput';
import { appFirebaseSignIn, appFirebaseCreateUser, appFirebaseSaveData } from 'store/slices/appFirebase';
import Spinner from 'components/Spinner/Spinner';

type LoginPropsType = {
  isOpen: boolean;
  close: () => void;
};

type Inputs = {
  email: string;
  password: string;
};

const Login = ({ isOpen, close }: LoginPropsType) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const tooltipContainer = useRef<HTMLDivElement | null>(null);
  const transition = useTransition(isOpen, null, {
    from: { opacity: 0, transform: 'translate(-50%, -70%)' },
    enter: { opacity: 1, transform: 'translate(-50%, -50%)' },
    leave: { opacity: 0, transform: 'translate(-50%, -70%)' },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      setLoading(true);
      if (isLogin) {
        await appFirebaseSignIn({ email, password });
      } else {
        await appFirebaseCreateUser({ email, password });
      }
      closeModal();
      setLoading(false);
    } catch (error) {
      dispatch(setNotification(error));
      setLoading(false);
    }
  });

  const closeModal = () => {
    close();
  };

  return (
    <>
      <Shadow isOpen={isOpen} onClick={closeModal} />
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              ref={tooltipContainer}
              className={styles.wrapper}
              key={key}
              style={props}
            >
              <ul className={styles.tabs}>
                <li
                  onClick={() => setIsLogin(true)}
                  className={isLogin ? styles.active : ''}
                >
                  Logowanie
                </li>
                <li
                  onClick={() => setIsLogin(false)}
                  className={!isLogin ? styles.active : ''}
                >
                  Rejestracja
                </li>
              </ul>
              <div className={styles.close} onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </div>
              <div>
                <form onSubmit={onSubmit}>
                  <LoginFormInput
                    label="Mail"
                    title="Podaj poprawny e-mail."
                    placeholder="Adres e-mail"
                    name="email"
                    tooltipContainer={tooltipContainer.current}
                    errors={errors.email}
                    register={() =>
                      register({
                        required: true,
                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })
                    }
                  />
                  <LoginFormInput
                    label="Hasło"
                    title="Hasło min. 6 znaków."
                    placeholder="Hasło"
                    name="password"
                    type="password"
                    tooltipContainer={tooltipContainer.current}
                    errors={errors.password}
                    register={() => register({ required: true, minLength: 6 })}
                  />
                  <div>
                    <button
                      disabled={isLoading}
                      className={styles.button}
                      type="submit"
                    >
                      {isLoading ? <Spinner /> : 'Wyślij'}
                    </button>
                  </div>
                </form>
              </div>
            </animated.div>
          )
      )}
    </>
  );
};

export default Login;
