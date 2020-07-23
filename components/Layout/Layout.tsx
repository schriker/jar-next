import React from 'react';
import Notification from '../Notification/Notification';
import { LayoutProps } from '../../types/layout';
import LayoutHead from './LayoutHead';
import styles from './Layout.module.css';

const Layout = ({ title, ogImage, ogDescription, children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <LayoutHead
        title={title}
        ogImage={ogImage}
        ogDescription={ogDescription}
      />
      {children}
      <Notification />
    </div>
  );
};

export default Layout;
