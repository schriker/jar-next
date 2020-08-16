import { NextPage } from 'next';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setNotification } from 'store/slices/appNotification';
import { setPoorchatUser } from 'store/slices/appPoorchat';
import { authCallback } from 'helpers/api';
import { PoorchatUser, PoorchatSubscription } from 'types/poorchat';
import Layout from 'components/Layout/Layout';
import Toolbar from 'components/Toolbar/Toolbar';
import Spinner from 'components/Spinner/Spinner';

type PageProps = {
  user: PoorchatUser | null;
  subscription: PoorchatSubscription | null;
};

const Callback: NextPage<PageProps> = ({ user, subscription }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = Cookies.get('callback_redirect');
      if (url) {
        router.push('/[streamer]/video/[video]', url);
      } else {
        router.push('/[streamer]', '/wonziu');
      }
    }
    if (user && subscription) {
      dispatch(setPoorchatUser({ user, subscription }));
      dispatch(setNotification(`Zalogowano jako: ${user.name}`));
    } else {
      dispatch(setNotification('Błąd autoryzacji.'));
    }
  }, []);

  return (
    <Layout
      title={`Archiwum Strumieni - logowanie`}
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
    const { user, subscription } = await authCallback(code as string);
    return {
      user,
      subscription,
    } as PageProps;
  } catch (err) {
    return {
      user: null,
      subscription: null,
    } as PageProps;
  }
};

export default Callback;
