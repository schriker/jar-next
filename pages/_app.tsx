import { AppProps } from 'next/app';
import '../styles.css';
import { Provider } from 'react-redux';
import store from '../store/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
