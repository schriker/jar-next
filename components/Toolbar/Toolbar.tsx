import React from 'react';
import ToolbarMenu from 'components/Toolbar/ToolbarMenu';
import Search from 'components/Search/Search';
import styles from 'components/Toolbar/Toolbar.module.css';

const Toolbar = () => {
  return (
    <div className={styles.toolbar}>
      <ToolbarMenu />
      <Search />
      <div style={{marginLeft: 'auto'}}>User</div>
    </div>
  );
};

export default Toolbar;
