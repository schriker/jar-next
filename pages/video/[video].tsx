import { NextPage } from 'next';
import Layout from '../../components/Layout/Layout';
import { useTypedSelector, RootState } from '../../store/rootReducer';

const Video: NextPage = () => {
  const appData = useTypedSelector((state) => state.appData);
  return (
    <Layout
      title={appData.client.hideWatched.toString()}
      ogImage="asd"
      ogDescription="asd"
    >
      Video Site
    </Layout>
  );
};

Video.getInitialProps = async ({ store, query }) => {
  const state: RootState = store.getState();

  return {
    props: { },
  };
};

export default Video;