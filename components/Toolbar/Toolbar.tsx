import React from 'react';
import dynamic from 'next/dynamic';
import ToolbarMenu from 'components/Toolbar/ToolbarMenu';
import ToggleWatched from 'components/ToggleWatched/ToggleWatched'
const Search = dynamic(() => import('components/Search/Search'), {
  ssr: false,
});
import styles from 'components/Toolbar/Toolbar.module.css';

const Toolbar = () => {
  return (
    <div className={styles.toolbar}>
      <ToolbarMenu />
      <Search />
      <div style={{ marginLeft: 'auto' }}>
        <ToggleWatched />
      </div>
    </div>
  );
};

export default Toolbar;
