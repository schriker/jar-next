import React from 'react';
import { LayoutProps } from '../../types/layout';
import LayoutHead from './LayoutHead';

const Layout = ({ title, ogImage, ogDescription, children }: LayoutProps) => {
  return (
    <div>
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
