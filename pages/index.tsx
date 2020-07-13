import axios from 'axios';
import Link from 'next/link';
import { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import Layout from '../components/Layout/Layout';
import { useTypedSelector } from '../store/rootReducer';
import { toggleHideWatched } from '../store/slices/appData';

const Index: NextPage = (props) => {
  const appData = useTypedSelector((state) => state.appData);
  const dispatch = useDispatch();
  return (
    <Layout
      title={appData.client.hideWatched.toString()}
      ogImage="asd"
      ogDescription="asd"
    >
      <Link href="/streamer">
        <a>Streamer</a>
      </Link>
      <button onClick={() => dispatch(toggleHideWatched())}>
        Change title
      </button>
    </Layout>
  );
};

Index.getInitialProps = async ({ store, pathname, req, res }) => {
  // async get initial props example
  // const json = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  // console.log(json.data);
  return {
    props: {},
  };
};

export default Index;
