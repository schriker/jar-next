import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchServerVideos } from 'helpers/api';
import { useRouter } from 'next/router';
const SearchResults = dynamic(() => import('components/Search/SearchResults'));
import useDebouncedSearch from 'hooks/useDebouncedSearch';
import styles from 'components/Search/Search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const useSearch = () =>
  useDebouncedSearch((searchValue: string, watched: string[]) =>
    fetchServerVideos(
      {
        page: 1,
        per_page: 5,
        streamer: 'wonziu',
        search: searchValue,
      },
      {
        watched: watched,
        favourite: [],
      }
    )
  );

const Search = () => {
  const [showResults, setShowResults] = useState<boolean>(false);
  const router = useRouter();
  const { inputText, setInputText, searchResults } = useSearch();
  const onChangeHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.length) {
      router.push(
        `/[streamer]?search=${inputText.trim()}`,
        `/wonziu?search=${inputText.trim()}`
      );
      setInputText('');
    }
  };

  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchResults.result) {
      if (event.keyCode === 40) {
        event.preventDefault();
        setFocusIndex((index) => {
          if (index === null || index === searchResults.result.videos.length) {
            return 0;
          } else {
            return index + 1;
          }
        });
      } else if (event.keyCode === 38) {
        event.preventDefault();
        setFocusIndex((index) => {
          if (index === null || index === 0) {
            return searchResults.result.videos.length;
          } else {
            return index - 1;
          }
        });
      } else if (event.keyCode === 13) {
        event.preventDefault();
        if (focusIndex === searchResults.result.videos.length || focusIndex === null) {
          router.push(
            `/[streamer]?search=${inputText.trim()}`,
            `/wonziu?search=${inputText.trim()}`
          );
        } else {
          router.push(
            `/[streamer]/video/[video]`,
            `/wonziu/video/${searchResults.result.videos[focusIndex].id}`
          );
        }
        setInputText('');
        setFocusIndex(null);
      } else {
        setFocusIndex(null);
      }
    }
  };

  const onFocus = () => {
    setFocusIndex(null);
    setShowResults(true);
  };

  const onResetForm = () => {
    setInputText('');
  };

  return (
    <div className={styles.searchWrapper}>
      {showResults && (
        <div
          onClick={() => setShowResults(false)}
          className={styles.back}
        ></div>
      )}
      <form onSubmit={onSubmitHandler} className={styles.searchForm}>
        <input
          onClick={() => setShowResults(true)}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          value={inputText}
          onChange={onChangeHanlder}
          placeholder="Słowa kluczowe"
          type="text"
          style={{ padding: '10px 55px 10px 20px' }}
        />
        <button className={styles.searchButton} type="submit">
          <span>
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </button>
      </form>
      {inputText.length >= 3 && showResults && (
        <SearchResults
          focus={focusIndex}
          isLoading={searchResults.loading}
          hideResults={() => setShowResults(false)}
          resetForm={onResetForm}
          searchValue={inputText}
          results={searchResults.result}
        />
      )}
    </div>
  );
};

export default Search;
