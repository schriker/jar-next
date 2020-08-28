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
  isLoading: boolean;
  resetForm: () => void;
  hideResults: () => void;
};

const SearchResults = ({
  results,
  hideResults,
  searchValue,
  resetForm,
  isLoading,
}: SearchResultPropsType) => {
  const ref = useRef(null);
  useOnClickOutside(ref, hideResults);
  console.log(isLoading);
  return (
    <div ref={ref} className={styles.wrapper}>
      {results && results.videos?.length ? (
        <>
          {results.videos.map((video) => {
            return (
              <Link
                key={video.id}
                href="/[streamer]/video/[video]"
                as={`/wonziu/video/${video.id}`}
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
        </>
      ) : isLoading ? (
        <div className={styles.resultsLoading}>
          <Spinner />
        </div>
      ) : (
        <span className={styles.noResults}>Niczego nie znaleźliśmy :(</span>
      )}
    </div>
  );
};

export default SearchResults;
