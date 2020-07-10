import { GetServerSideProps } from 'next';
import { useTypedSelector } from '../store/rootReducer';
import Layout from '../components/Layout/Layout';

export default function Index({ data }) {
  const appData = useTypedSelector(state => state.appData);

  return (
    <Layout
      title={appData.hideWatched.toString()}
      ogImage="asd"
      ogDescription="asd"
    >
      asd
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
