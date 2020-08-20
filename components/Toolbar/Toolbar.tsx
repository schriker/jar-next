import React from 'react';
import dynamic from 'next/dynamic';
import ToolbarMenu from 'components/Toolbar/ToolbarMenu';
import ToggleWatched from 'components/ToggleWatched/ToggleWatched';
import ToolbarUser from 'components/Toolbar/ToolbarUser';
const Search = dynamic(() => import('components/Search/Search'), {
  ssr: false,
});
import styles from 'components/Toolbar/Toolbar.module.css';

const Toolbar = () => {
  return (
    <div className={styles.toolbar}>
      <ToolbarMenu />
      <Search />
      <div className={styles.right}>
        <ToggleWatched />
        <ToolbarUser />
      </div>
    </div>
  );
};

export default Toolbar;
