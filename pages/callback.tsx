import { NextPage } from 'next';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setNotification } from 'store/slices/appNotification';
import { setPoorchatUser } from 'store/slices/appPoorchat';
import { authCallback } from 'helpers/api';
import Layout from 'components/Layout/Layout';
import Toolbar from 'components/Toolbar/Toolbar';
import Spinner from 'components/Spinner/Spinner';

const Callback: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = Cookies.get('callback_redirect');
      if (url) {
        router.push('/[streamer]/video/[video]', url);
      } else {
        router.push('/[streamer]', '/wonziu');
      }
    }
  }, []);

  return (
    <Layout
      title={`Archiwum Strumieni - Logowanie`}
      ogDescription="Oglądaj powtórki strumieni z czatem."
    >
      <Toolbar />
      <Spinner />
    </Layout>
  );
};

Callback.getInitialProps = async ({ store, query, res }) => {
  try {
    const { code } = query;
    const { user, subscription, cookies, blockedUsers } = await authCallback(
      code as string
    );
    store.dispatch(setPoorchatUser({ user, subscription, blockedUsers }));
    store.dispatch(setNotification(`Zalogowano jako: ${user.name}`));
    if (res) {
      res.setHeader('set-cookie', [...cookies]);
    }
  } catch (err) {
    store.dispatch(setNotification('Błąd autoryzacji.'));
  }
};

export default Callback;
