import { NextPage } from 'next';
import { Video } from 'types/video';
import { Streamer } from 'types/streamer';
import styles from 'pages/[streamer]/video/video.module.css';
import trimString from 'helpers/trimString';
import { setNotification } from 'store/slices/appNotification';
import { fetchServerVideoById, fetchTwitchVideos } from 'helpers/api';
import Layout from 'components/Layout/Layout';
import Player from 'components/Player/Player';
import { RootState } from 'store/rootReducer';
import { TwitchVideoQuery } from 'types/api';
import CustomError404 from 'pages/404';

type PageProps = {
  video: Video | null;
  streamer: Streamer;
};

const VideoPage: NextPage<PageProps> = ({ video, streamer }) => {
  return video ? (
    <Layout
      title={`${streamer.displayName} - ${trimString(video.title, 25)}`}
      ogImage={video.thumbnail
        .replace('%{width}', '640')
        .replace('%{height}', '360')}
      ogDescription="Oglądaj powtórki strumieni z czatem."
    >
      <div className={styles.wrapper}>
        <div>
          <Player streamer={streamer} video={video} />
        </div>
        <div
          style={{ width: '365px', backgroundColor: '#1c1c1c', height: '100vh' }}
        ></div>
      </div>
    </Layout>
  ) : (
    <Layout
      title={`Coś poszło nie tak :(`}
      ogImage={'/img_placeholder.jpg'}
      ogDescription="Oglądaj powtórki strumieni z czatem."
    >
      <CustomError404 />
    </Layout>
  );
};

VideoPage.getInitialProps = async ({ store, query }) => {
  const state: RootState = store.getState();
  let video: Video | null = null;
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

  try {
    if (query.streamer === 'wonziu') {
      const serverQuery = {
        streamer: query.streamer,
        id: query.video as string,
      };
      const response = await fetchServerVideoById(serverQuery);
      if (!Object.keys(response.video).length) {
        throw new Error();
      }
      video = response.video;
    } else {
      if (streamer) {
        const twitchQuery: TwitchVideoQuery = {
          id: query.video as string,
        };
        const response = await fetchTwitchVideos(twitchQuery);
        video = response.videos[0];
      }
    }
    return {
      streamer: streamer,
      video: video,
    } as PageProps;
  } catch (err) {
    store.dispatch(setNotification('Takie video nie istnieje.'));
    return {
      streamer: streamer,
      video: null,
    } as PageProps;
  }
};

export default VideoPage;
