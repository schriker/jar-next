import '../styles.css';
import React from 'react';
import { fetchStreamers, fetchStreams, fetchGames } from '../helpers/api';
import { TwitchGame, TwitchStream, TwitchStreamer } from '../types/twitch';
import { setServerStreamers } from '../store/slices/appData';
import mergeStreamersData from '../helpers/mergeStreamersData';
import { RootState } from '../store/rootReducer';
import { wrapper } from '../store/store';
import Sidebar from '../components/Sidebar/Sidebar';
import App, { AppInitialProps, AppContext } from 'next/app';

class MyApp extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    const isServer = typeof window === 'undefined';
    if (isServer) {
      let serverGames: TwitchGame[] = [];
      const state: RootState = ctx.store.getState();
      const { data: serverStreamers }: { data: TwitchStreamer[] } = await fetchStreamers(
        state.appData.server.streamers
      );
      const { data: serverStreams }: { data: TwitchStream[] } = await fetchStreams(
        state.appData.server.streamers
      );
      if (serverStreams.length) {
        const games = serverStreams.map(stream => stream.game_id);
        const { data }: { data: TwitchGame[] } = await fetchGames(games);
        serverGames = data;
      }
      const streamersData = mergeStreamersData(serverStreamers, serverStreams, serverGames);
      ctx.store.dispatch(setServerStreamers(streamersData));
    }

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
    return (
      <div>
        <Sidebar />
        <Component {...pageProps} />
      </div>
    );
  }
}

export default wrapper.withRedux(MyApp);
