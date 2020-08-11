import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import styles from 'components/ControllButton/ControllButton.module.css';

type ControllButtonPropsType = {
  children: React.ReactNode;
  onClick: () => void;
  tooltip: string;
  red?: boolean;
};

const ControllButton = ({
  children,
  onClick,
  red,
  tooltip,
}: ControllButtonPropsType) => {
  return (
    <Tooltip title={tooltip} placement="top" arrow>
      <div onClick={onClick} className={red ? styles.red : styles.button}>
        {children}
      </div>
    </Tooltip>
  );
};

export default ControllButton;
