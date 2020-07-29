import React, { useRef } from 'react';
import moment from 'moment';
import Link from 'next/link';
import useOnClickOutside from 'use-onclickoutside';
import styles from 'components/Search/SearchResults.module.css';
import { Video } from 'types/video';
import trimString from 'helpers/trimString';
import Spinner from 'components/Spinner/Spinner';
import VideoImagePlaceholder from 'components/Videos/VideoImagePlaceholder';
import SearchResultThumbnail from 'components/Search/SearchResultThumbnail';

type SearchResultPropsType = {
  results:
    | {
        videos: Video[];
        count: number;
      }
    | undefined;
  searchValue: string;
  resetForm: () => void;
  hideResults: () => void;
};

const SearchResults = ({
  results,
  hideResults,
  searchValue,
  resetForm,
}: SearchResultPropsType) => {
  const ref = useRef(null);
  useOnClickOutside(ref, hideResults);

  return results && results.videos?.length ? (
    <div ref={ref} className={styles.wrapper}>
      {results.videos.map((video) => {
        return (
          <Link
            key={video._id}
            href="/video/[video]"
            as={`/video/${video._id}`}
          >
            <a>
              <div className={styles.result}>
                <div className={styles.thumbnail}>
                  <Spinner />
                  <VideoImagePlaceholder />
                  <SearchResultThumbnail url={video.thumbnail} />
                  <div className={styles.duration}>{video.duration}</div>
                </div>
                <div className={styles.details}>
                  <div className={styles.title}>
                    {trimString(video.title, 30)}
                  </div>
                  <div className={styles.date}>
                    {moment(video.started).format('DD-MM-YYYY • HH:mm:ss')}
                  </div>
                </div>
              </div>
            </a>
          </Link>
        );
      })}
      {results.count > results.videos?.length && (
        <Link
          href={`/[streamer]?search=${searchValue}`}
          as={`/wonziu?search=${searchValue}`}
        >
          <a onClick={() => resetForm()} className={styles.more}>
            Zobacz wszystkie wyniki.
          </a>
        </Link>
      )}
    </div>
  ) : null;
};

export default SearchResults;
