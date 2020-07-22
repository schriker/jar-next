import { NextPage } from 'next';
import { Video } from '../../../types/video';
import Error404 from '../../404';
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
  paginationCursor: string;
};

const Page: NextPage<PageProps> = ({
  streamer,
  videos,
  count,
  paginationCursor,
}) => {
  return !videos.length ? (
    <Error404 />
  ) : (
    <Layout
      title={`Archiwum Strumieni - ${streamer.displayName}`}
      ogImage={streamer.profileImage}
      ogDescription="Oglądaj archiwalne strumyki z czatem jadisco."
    >
      <Videos videos={videos} />
      <Pagination paginationCursor={paginationCursor} count={count} />
    </Layout>
  );
};

Page.getInitialProps = async ({ store, query }) => {
  const state: RootState = store.getState();
  let videos: Video[] = [];
  let paginationCursor = '';
  let count = 0;
  let allStreamersData = [...state.appData.server.streamersData];
  if (state.appData.client.streamersData) {
    allStreamersData = [
      ...allStreamersData,
      ...state.appData.client.streamersData,
    ];
  }
  const streamer = allStreamersData.find(
    (streamer) => streamer.login === query.streamer
  );
  if (
    (query.streamer === 'wonziu' && parseInt(query.page as string) > 0) ||
    (query.streamer === 'wonziu' && !query.page)
  ) {
    const response = await fetchServerVideos(
      query.streamer as string,
      query.page ? parseInt(query.page as string) : 1
    );
    videos = response.videos;
    count = response.count;
  } else if (query.streamer !== 'wonziu') {
    if (streamer) {
      const response = await fetchTwitchVideos(streamer.id);
      videos = response.videos;
      paginationCursor = response.paginationCursor;
    }
  }
  return {
    videos: videos,
    count: count,
    streamer: streamer,
    paginationCursor: paginationCursor,
  } as PageProps;
};

export default Page;
