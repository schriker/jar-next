import { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../store/rootReducer';
import Layout from '../components/Layout/Layout';
import { toggleHideWatched } from '../store/slices/appDataSlice';

export default function Index() {
  const appData = useTypedSelector(state => state.appData);
  const dispatch = useDispatch()
  return (
    <Layout
      title={appData.hideWatched.toString()}
      ogImage="asd"
      ogDescription="asd"
    >
      <button onClick={() => dispatch(toggleHideWatched())}>Change title</button>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { },
  };
};
