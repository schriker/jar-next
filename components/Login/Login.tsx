import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setNotification } from 'store/slices/appNotification';
import styles from 'components/Login/Login.module.css';
import FormInput from 'components/Form/FormInput';
import {
  appFirebaseSignIn,
  appFirebaseCreateUser,
} from 'store/slices/appFirebase';
import Modal from 'components/Modal/Modal';
import FormSubmitButton from 'components/Form/FormSubmitButton';

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
    <Modal close={closeModal} isOpen={isOpen}>
      {(tooltipContainer) => (
        <>
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
          <div>
            <form onSubmit={onSubmit}>
              <FormInput
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
              <FormInput
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
                <FormSubmitButton disabled={isLoading} />
              </div>
            </form>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Login;
