import React from 'react';
import Head from 'next/head';
import { LayoutHeadProps } from 'types/layout';
import { useRouter } from 'next/router';

const LayoutHead = ({ title, ogImage, ogDescription }: LayoutHeadProps) => {
  let router = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.HOST}${router.asPath}`}
        />
        <meta property="og:image" content={ogImage} />
        <meta content="1800" property="og:image:width" />
        <meta content="950" property="og:image:height" />
        <meta property="og:description" content={ogDescription} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=auto"
        ></meta>
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <script src="https://twemoji.maxcdn.com/v/latest/twemoji.min.js"></script>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-131295801-1"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments)}
        gtag("js", new Date());
        gtag("config", "UA-131295801-1");
    `,
          }}
        ></script>
      </Head>
    </>
  );
};

export default LayoutHead;
