import { wrapper } from '../store/store';
import { useDispatch } from 'react-redux';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout/Layout';
import { useTypedSelector } from '../store/rootReducer';
import { toggleHideWatched } from '../store/slices/appDataSlice';

export default function Index(props) {
  const appData = useTypedSelector((state) => state.appData);
  const dispatch = useDispatch();
  return (
    <Layout
      title={appData.hideWatched.toString()}
      ogImage="asd"
      ogDescription="asd"
    >
      <button onClick={() => dispatch(toggleHideWatched())}>
        Change title
      </button>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    console.log(store.getState());
    // store.dispatch(toggleHideWatched());
    return {
      props: {
        test: 'test'
      }
    }
  }
);
