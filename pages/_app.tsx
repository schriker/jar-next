import '../styles.css';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStreamersData } from '../helpers/api';
import { setServerStreamers, setAppData } from '../store/slices/appData';
import { RootState } from '../store/rootReducer';
import { wrapper } from '../store/store';
import Sidebar from '../components/Sidebar/Sidebar';
import App, { AppInitialProps, AppContext } from 'next/app';

class MyApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    const isServer = typeof window === 'undefined';
    if (isServer) {
      try {
        const state: RootState = ctx.store.getState();
        const streamersData = await fetchStreamersData(
          state.appData.server.streamers
        );
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
    const appData = localStorage.getItem('jarchiwumData');
    if (appData) {
      // @ts-expect-error: Need to pass setAppData to this.props type
      this.props.setAppData(JSON.parse(appData));
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    setAppData: (appData: any) => dispatch(setAppData(appData))
  }
}

export default wrapper.withRedux(connect(null, mapDispatchToProps)(MyApp));
