import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useTypedSelector } from 'store/rootReducer';
import { Video } from 'types/video';
import Pagination from 'components/Pagination/Pagination';
import Layout from 'components/Layout/Layout';
import { ServerVideoQuery } from 'types/api';
import { fetchServerVideos } from 'helpers/api';
import Spinner from 'components/Spinner/Spinner';
import Videos from 'components/Videos/Videos';
import Toolbar from 'components/Toolbar/Toolbar';
import CustomError from 'components/CustomError/CustomError';

const FavourtiePage: NextPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const appData = useTypedSelector((state) => state.appData);
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async (favourite: string[], watched: string[]) => {
      setIsLoading(true);
      setVideos([]);
      const serverQuery: ServerVideoQuery = {
        ...router.query,
        streamer: 'wonziu',
        page: router.query.page ? parseInt(router.query.page as string) : 1,
        per_page: 24,
      };
      const response = await fetchServerVideos(serverQuery, {
        watched: appData.server.hideWatched ? watched : [],
        favourite: favourite ? favourite : [],
      });
      setIsLoading(false);
      setCount(response.count);
      setVideos(response.videos);
    };
    if (appData.client.bookmarksId.length) {
      fetchVideos(appData.client.bookmarksId, appData.client.watched);
    } else {
      setCount(0);
      setVideos([]);
    }
  }, [appData.server.hideWatched, router.query, appData.client.bookmarksId]);

  return !videos.length ? (
    <Layout
      title={`Archiwum Strumieni - Ulubione`}
      ogImage="/img_placeholder.jpg"
      ogDescription="Oglądaj powtórki strumieni z czatem."
    >
      <Toolbar />
      {isLoading && <Spinner />}
      {!isLoading && (
        <CustomError code="404" message="Twoja lista ulubionych jest pusta." />
      )}
    </Layout>
  ) : (
    <Layout
      title={`Archiwum Strumieni - Ulubione`}
      ogImage="/img_placeholder.jpg"
      ogDescription="Oglądaj powtórki strumieni z czatem."
    >
      <Toolbar />
      <Videos videos={videos} />
      <Pagination paginationCursor="" count={count} />
    </Layout>
  );
};

export default FavourtiePage;
