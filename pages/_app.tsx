import Notification from 'components/Notification/Notification';
import Sidebar from 'components/Sidebar/Sidebar';
import { auth, fetchStreamersData } from 'helpers/api';
import 'ircstyles.css';
import App, { AppInitialProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress.css';
import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { connect } from 'react-redux';
import 'react_dates_overrides.css';
import 'simplebar/dist/simplebar.min.css';
import { RootState } from 'store/rootReducer';
import { addServerStreamer, setServerStreamers } from 'store/slices/appData';
import { appFirebaseAuthStateChanged } from 'store/slices/appFirebase';
import { setPoorchatUser } from 'store/slices/appPoorchat';
import { wrapper } from 'store/store';
import 'styles.css';

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
  public static getInitialProps = wrapper.getInitialAppProps(
    (store) =>
      async ({ Component, ctx }) => {
        const state: RootState = store.getState();
        if (typeof window === 'undefined') {
          const serverStreamers = [...state.appData.server.streamers];
          if (ctx.query.streamer) {
            if (
              !state.appData.server.streamers.includes(
                ctx.query.streamer as string
              )
            ) {
              store.dispatch(addServerStreamer(ctx.query.streamer as string));
              serverStreamers.push(ctx.query.streamer as string);
            }
          }
          try {
            const streamersData = await fetchStreamersData(serverStreamers);
            store.dispatch(setServerStreamers(streamersData));
          } catch (error) {}
          try {
            if (ctx.req && ctx.req.headers.cookie?.includes('payload_cookie')) {
              const { user, subscription, blockedUsers } = await auth(
                ctx.req.headers.cookie
              );
              store.dispatch(
                setPoorchatUser({ user, subscription, blockedUsers })
              );
            }
          } catch (error) {}
        }

        return {
          pageProps: {
            ...(Component.getInitialProps
              ? await Component.getInitialProps(ctx)
              : {}),
          },
        };
      }
  );

  componentDidMount() {
    // @ts-expect-error: Need to pass setAppData to this.props type
    this.props.firebaseAuthStateChanged();
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Sidebar />
        <Notification />
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
    firebaseAuthStateChanged: () => dispatch(appFirebaseAuthStateChanged()),
  };
};

export default wrapper.withRedux(
  connect(mapStateToProps, mapDispatchToProps)(MyApp)
);
