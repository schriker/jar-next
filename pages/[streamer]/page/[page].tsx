import { NextPage } from 'next';
import { Video } from '../../../types/video';
import Layout from '../../../components/Layout/Layout';
import { fetchServerVideos } from '../../../helpers/api';
import { RootState } from '../../../store/rootReducer';
import { Streamer } from '../../../types/streamer';

type PageProps = {
  videos: Video[];
  streamer: Streamer;
};

const Page: NextPage<PageProps> = (props) => {
  return (
    <Layout
      title={`Archiwum Strumieni - ${props.streamer.displayName}`}
      ogImage={props.streamer.profileImage}
      ogDescription='Oglądaj archiwalne strumyki z czatem jadisco.'
    >
      Page
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
    // Get Data From Twitch
  }
  return {
    videos: videos,
    streamer: streamer,
  } as PageProps;
};

export default Page;
