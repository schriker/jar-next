import { GetServerSideProps } from 'next';
import Layout from '../components/Layout/Layout';

export default function Index() {

  return (
    <Layout
      title="Streamer"
      ogImage="asd"
      ogDescription="asd"
    >
      Streamer Page
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
