import { GetServerSideProps } from 'next';
import { useTypedSelector } from '../store/rootReducer';
import Layout from '../components/Layout/Layout';

export default function Index() {
  const appData = useTypedSelector(state => state.appData);
  return (
    <Layout
      title={appData.hideWatched.toString()}
      ogImage="asd"
      ogDescription="asd"
    >
      Index
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { },
  };
};
