import App from 'next/app';
import { AppProps } from 'next/app';
import '../styles.css';
import { Provider } from 'react-redux';
import { useStore, initializeStore } from '../store/store';
import { toggleHideWatched } from '../store/slices/appDataSlice';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

  dispatch(toggleHideWatched());
  appProps.pageProps.initialReduxState = reduxStore.getState();
  return { ...appProps };
};

export default MyApp;
