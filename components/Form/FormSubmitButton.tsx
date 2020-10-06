import Spinner from 'components/Spinner/Spinner';
import React from 'react';
import styles from 'components/Form/FormSubmitButton.module.css';

type FormSubmitButtonPropsType = {
  disabled: boolean;
}

const FormSubmitButton = ({ disabled }: FormSubmitButtonPropsType) => {
  return (
    <button
    disabled={disabled}
    className={styles.button}
    type="submit"
  >
    {disabled ? <Spinner /> : 'Wyślij'}
  </button>
  );
};

export default FormSubmitButton;