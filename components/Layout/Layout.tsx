import React from 'react';
import { LayoutProps } from 'types/layout';
import LayoutHead from 'components/Layout/LayoutHead';
import styles from 'components/Layout/Layout.module.css';

const Layout = ({
  title,
  ogImage = '',
  ogDescription,
  children,
}: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <LayoutHead
        title={title}
        ogImage={ogImage}
        ogDescription={ogDescription}
      />
      {children}
    </div>
  );
};

export default Layout;
