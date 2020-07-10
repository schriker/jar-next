import React from 'react';
import LayoutHead from '../LayoutHead/LayoutHead';

type LayoutProps = {
  title: string;
  ogImage: string;
  ogDescription: string;
  children: React.ReactNode;
};

export default function Layout({
  title,
  ogImage,
  ogDescription,
  children,
}: LayoutProps) {
  return (
    <>
      <LayoutHead
        title={title}
        ogImage={ogImage}
        ogDescription={ogDescription}
      />
      {children}
    </>
  );
}
