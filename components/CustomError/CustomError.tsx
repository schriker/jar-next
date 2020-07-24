import React from 'react';
import styles from 'components/CustomError/CustomError.module.css';

type CustomErrorPropsType = {
  code: string;
  message: string;
};

const CustomError = ({ code, message }: CustomErrorPropsType) => {
  return (
    <div className={styles.customError}>
      <h1>{code}</h1>
      <span>{message}</span>
    </div>
  );
};

export default CustomError;
