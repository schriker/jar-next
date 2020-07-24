import React from 'react';
import ToolbarMenu from 'components/Toolbar/ToolbarMenu';
import styles from 'components/Toolbar/Toolbar.module.css';

const Toolbar = () => {
  return (
    <div className={styles.toolbar}>
      <ToolbarMenu />
    </div>
  );
};

export default Toolbar;
