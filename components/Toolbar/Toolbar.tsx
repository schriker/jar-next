import React from 'react';
import dynamic from 'next/dynamic';
import ToolbarMenu from 'components/Toolbar/ToolbarMenu';
const Search = dynamic(() => import('components/Search/Search'), {
  ssr: false,
});
import styles from 'components/Toolbar/Toolbar.module.css';

const Toolbar = () => {
  return (
    <div className={styles.toolbar}>
      <ToolbarMenu />
      <Search />
      <div style={{ marginLeft: 'auto' }}>User</div>
    </div>
  );
};

export default Toolbar;
