import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

type LayoutHeadProps = {
  title: string;
  ogImage: string;
  ogDescription: string;
};

export default function LayoutHead({
  title,
  ogImage,
  ogDescription,
}: LayoutHeadProps) {
  let router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.HOST}${router.pathname}`} />
        <meta property="og:image" content={ogImage} />
        <meta content="1800" property="og:image:width" />
        <meta content="950" property="og:image:height" />
        <meta property="og:description" content={ogDescription} />
      </Head>
    </>
  );
}
