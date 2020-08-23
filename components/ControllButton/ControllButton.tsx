import React, { useRef } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import styles from 'components/ControllButton/ControllButton.module.css';

type ControllButtonPropsType = {
  children: React.ReactNode;
  onClick: () => void;
  tooltip: string;
  tooltipContainer: HTMLDivElement | null;
  red?: boolean;
};

const ControllButton = ({
  children,
  onClick,
  red,
  tooltip,
  tooltipContainer,
}: ControllButtonPropsType) => {
  return (
    <div>
      <Tooltip
        title={tooltip}
        placement="top"
        arrow
        PopperProps={{ container: tooltipContainer }}
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
