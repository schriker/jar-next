import React from 'react';
import Tooltip from 'components/Tooltip/Tooltip';
import styles from 'components/ControllButton/ControllButton.module.css';

type ControllButtonPropsType = {
  id: string;
  children: React.ReactNode;
  onClick: () => void;
  tooltip: string;
  red?: boolean;
};

const ControllButton = ({
  id,
  children,
  onClick,
  red,
  tooltip,
}: ControllButtonPropsType) => {
  return (
    <>
      <Tooltip id={id} />
      <div
        onClick={onClick}
        data-tip={tooltip}
        data-for={id}
        className={red ? styles.red : styles.button}
      >
        {children}
      </div>
    </>
  );
};

export default ControllButton;
