import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { animated, useTransition } from 'react-spring';
import Shadow from 'components/Shadow/Shadow';
import styles from 'components/Login/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@material-ui/core/Tooltip';

type LoginPropsType = {
  isOpen: boolean;
  close: () => void;
};

type Inputs = {
  email: string;
  password: string;
};

const Login = ({ isOpen, close }: LoginPropsType) => {
  const tooltipContainer = useRef<HTMLDivElement | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const transition = useTransition(isOpen, null, {
    from: { opacity: 0, transform: 'translate(-50%, -70%)' },
    enter: { opacity: 1, transform: 'translate(-50%, -50%)' },
    leave: { opacity: 0, transform: 'translate(-50%, -70%)' },
  });

  const onSubmit = handleSubmit(({ email, password }) => {
    console.log(email, password);
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
                  <div className={styles.row}>
                    <label htmlFor="email">Mail</label>
                    <Tooltip
                      PopperProps={{ container: tooltipContainer.current }}
                      title="Podaj poprawny e-mail."
                      open={!!errors.email}
                      placement="left"
                      arrow
                    >
                      <input
                        ref={register({
                          required: true,
                          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Adres e-mail"
                      />
                    </Tooltip>
                  </div>
                  <div className={styles.row}>
                    <label htmlFor="password">Hasło</label>
                    <Tooltip
                      PopperProps={{ container: tooltipContainer.current }}
                      title="Hasło min. 6 znaków."
                      open={!!errors.password}
                      placement="left"
                      arrow
                    >
                      <input
                        ref={register({ required: true, minLength: 6 })}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Hasło"
                      />
                    </Tooltip>
                  </div>
                  <div>
                    <button className={styles.button} type="submit">
                      Wyślij
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
