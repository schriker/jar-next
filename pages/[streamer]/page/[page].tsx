import { NextPage } from 'next';
import { Video } from '../../../types/video';
import { setVideos } from '../../../store/slices/appVideos';
import Layout from '../../../components/Layout/Layout';
import { fetchServerVideos, fetchTwitchVideos } from '../../../helpers/api';
import { RootState } from '../../../store/rootReducer';
import { Streamer } from '../../../types/streamer';
import Videos from '../../../components/Videos/Videos';

type PageProps = {
  streamer: Streamer;
};

const Page: NextPage<PageProps> = ({ streamer }) => {
  return (
    <Layout
      title={`Archiwum Strumieni - ${streamer.displayName}`}
      ogImage={streamer.profileImage}
      ogDescription="Oglądaj archiwalne strumyki z czatem jadisco."
    >
      <Videos />
    </Layout>
  );
};

Page.getInitialProps = async ({ store, query }) => {
  let videos: Video[] = [];
  const state: RootState = store.getState();
  const allStreamersData = [
    ...state.appData.server.streamersData,
    ...state.appData.client.streamersData,
  ];
  const streamer = allStreamersData.find(
    (streamer) => streamer.login === query.streamer
  );
  if (query.streamer === 'wonziu') {
    videos = await fetchServerVideos(
      query.streamer as string,
      query.page ? parseInt(query.page as string) : 1
    );
  } else {
    if (streamer) {
      videos = await fetchTwitchVideos(streamer.id);
    }
  }
  store.dispatch(setVideos(videos));
  return {
    streamer: streamer,
  } as PageProps;
};

export default Page;
