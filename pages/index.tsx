import Link from 'next/link';
import { NextPage } from 'next';
import { RootState } from 'store/rootReducer';

const Index: NextPage = () => {
  return null;
};

Index.getInitialProps = async ({ store, res }) => {
  const state: RootState = store.getState();
  if (res) {
    res.writeHead(302, { Location: `/${state.appData.server.streamers[0]}` });
    res.end();
  }
  return {
    props: {},
  };
};

export default Index;
