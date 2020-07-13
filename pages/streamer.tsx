import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout/Layout';
import { useTypedSelector } from '../store/rootReducer';

export default function Index() {
  const appData = useTypedSelector((state) => state.appData);

  return (
    <Layout
      title={appData.client.hideWatched.toString()}
      ogImage="asd"
      ogDescription="asd"
    >
      <Link href="/"><a>Home</a></Link>
      Streamer Page
    </Layout>
  );
}
