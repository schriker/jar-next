import { NextPage } from 'next';
import { Video } from '../../../types/video';
import Pagination from '../../../components/Pagination/Pagination';
import Layout from '../../../components/Layout/Layout';
import { fetchServerVideos, fetchTwitchVideos } from '../../../helpers/api';
import { RootState } from '../../../store/rootReducer';
import { Streamer } from '../../../types/streamer';
import Videos from '../../../components/Videos/Videos';

type PageProps = {
  streamer: Streamer;
  videos: Video[];
  count: number;
};

const Page: NextPage<PageProps> = ({ streamer, videos, count }) => {
  return (
    <Layout
      title={`Archiwum Strumieni - ${streamer.displayName}`}
      ogImage={streamer.profileImage}
      ogDescription="Oglądaj archiwalne strumyki z czatem jadisco."
    >
      <Videos videos={videos} />
      <Pagination count={count} />
    </Layout>
  );
};

Page.getInitialProps = async ({ store, query }) => {
  let videos: Video[] = [];
  let count = 0;
  const state: RootState = store.getState();
  const allStreamersData = [
    ...state.appData.server.streamersData,
    ...state.appData.client.streamersData,
  ];
  const streamer = allStreamersData.find(
    (streamer) => streamer.login === query.streamer
  );
  if (query.streamer === 'wonziu') {
    const response = await fetchServerVideos(
      query.streamer as string,
      query.page ? parseInt(query.page as string) : 1
    );
    videos = response.videos;
    count = response.count;
  } else {
    if (streamer) {
      videos = await fetchTwitchVideos(streamer.id);
    }
  }
  return {
    videos: videos,
    count: count,
    streamer: streamer,
  } as PageProps;
};

export default Page;
