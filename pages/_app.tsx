import '../styles.css';
import '../nprogress.css';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStreamersData } from '../helpers/api';
import {
  setServerStreamers,
  setAppData,
  addServerStreamer,
} from '../store/slices/appData';
import { RootState } from '../store/rootReducer';
import { wrapper } from '../store/store';
import Sidebar from '../components/Sidebar/Sidebar';
import App, { AppInitialProps, AppContext } from 'next/app';

import NProgress from 'nprogress';
import Router from 'next/router';


Router.events.on('routeChangeStart', () => {
  NProgress.start();
  NProgress.set(0.25);
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});

class MyApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    const state: RootState = ctx.store.getState();
    if (!process.browser) {
      const serverStreamers = [...state.appData.server.streamers];
      if (ctx.query.streamer) {
        if (
          !state.appData.server.streamers.includes(ctx.query.streamer as string)
        ) {
          ctx.store.dispatch(addServerStreamer(ctx.query.streamer as string));
          serverStreamers.push(ctx.query.streamer as string);
        }
      }
      try {
        const streamersData = await fetchStreamersData(serverStreamers);
        ctx.store.dispatch(setServerStreamers(streamersData));
      } catch (err) {
        // Handle Error
      }
    }

    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
      },
    };
  };

  componentDidMount() {
    const localUserData = localStorage.getItem('jarchiwumData');
    if (localUserData) {
      const userData = JSON.parse(localUserData);
      // @ts-expect-error: Need to pass setAppData to this.props type
      const { serverStreamers }: { serverStreamers: string[] } = this.props;
      userData.streamers = userData.streamers.filter(
        (streamer: string) => !serverStreamers.includes(streamer)
      );
      // @ts-expect-error: Need to pass setAppData to this.props type
      this.props.setAppData(userData);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Sidebar />
        <Component {...pageProps} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    serverStreamers: state.appData.server.streamers,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setAppData: (appData: any) => dispatch(setAppData(appData)),
  };
};

export default wrapper.withRedux(
  connect(mapStateToProps, mapDispatchToProps)(MyApp)
);
