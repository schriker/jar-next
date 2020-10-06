import { NextPage } from 'next';
import { Video } from 'types/video';
import styles from 'pages/[streamer]/video/video.module.css';
import trimString from 'helpers/trimString';
import Layout from 'components/Layout/Layout';
import Player from 'components/Player/Player';
import Chat from 'components/Chat/Chat';
import CustomError404 from 'pages/404';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useRouter } from 'next/router';

const SingleVideoPage: NextPage = () => {
  const handle = useFullScreenHandle();
  const router = useRouter();
  const video: Video = JSON.parse(router.query.video as string);
  
  return Object.keys(video).length ? (
    <Layout
      title={`Archiwum - ${trimString(video.title, 35)}`}
      ogImage={video.thumbnail
        .replace('%{width}', '640')
        .replace('%{height}', '360')}
      ogDescription="Oglądaj powtórki strumieni z czatem."
    >
      <FullScreen handle={handle}>
        <div className={styles.wrapper}>
          <Player video={video} fullscreen={handle} />
          <Chat video={video} />
        </div>
      </FullScreen>
    </Layout>
  ) : (
    <Layout
      title={`Coś poszło nie tak :(`}
      ogImage="/img_placeholder.jpg"
      ogDescription="Oglądaj powtórki strumieni z czatem."
    >
      <CustomError404 />
    </Layout>
  );
};

export default SingleVideoPage;
