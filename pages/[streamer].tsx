import Link from 'next/link';
import { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import { useTypedSelector, RootState } from '../store/rootReducer';

const Streamer: NextPage = () => {
  const appData = useTypedSelector((state) => state.appData);

  return (
    <Layout
      title={appData.client.hideWatched.toString()}
      ogImage="asd"
      ogDescription="asd"
    >
    </Layout>
  );
};

Streamer.getInitialProps = async ({ store, query }) => {
  const state: RootState = store.getState();

  return {
    props: { },
  };
};

export default Streamer;
