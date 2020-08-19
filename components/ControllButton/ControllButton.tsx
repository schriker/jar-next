import React, { useRef } from 'react';
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
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={ref}>
      <Tooltip
        title={tooltip}
        placement="top"
        arrow
        PopperProps={{ container: ref.current }}
      >
        <div
          onClick={onClick}
          className={styles.button}
          style={{ backgroundColor: red ? '#f00' : '#383838' }}
        >
          {children}
        </div>
      </Tooltip>
    </div>
  );
};

export default ControllButton;
