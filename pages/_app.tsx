import '../styles.css';
import React from 'react';
import { wrapper } from '../store/store';
import App, { AppInitialProps, AppContext } from 'next/app';
import { toggleHideWatched } from '../store/slices/appDataSlice';

class MyApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    ctx.store.dispatch(toggleHideWatched());

    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
      },
    };
  };

  public render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
