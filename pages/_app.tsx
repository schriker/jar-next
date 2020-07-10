import { AppProps } from 'next/app';
import App from 'next/app';
import '../styles.css';
import { Provider } from 'react-redux';
import store from '../store/store';

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  appProps.pageProps.viewer = { id: 'monkey' }
  return { ...appProps }
}

export default MyApp;
