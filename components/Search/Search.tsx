import React, { useState } from 'react';
import { fetchServerVideos } from 'helpers/api';
import { useRouter } from 'next/router';
import SearchResults from 'components/Search/SearchResults';
import useDebouncedSearch from 'hooks/useDebouncedSearch';
import styles from 'components/Search/Search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const useSearch = () =>
  useDebouncedSearch((searchValue: string) =>
    fetchServerVideos({
      page: 1,
      per_page: 5,
      streamer: 'wonziu',
      search: searchValue,
    })
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
          onFocus={() => setShowResults(true)}
          value={inputText}
          onChange={onChangeHanlder}
          placeholder="Słowa kluczowe"
          type="text"
        />
        <button className={styles.searchButton} type="submit">
          <span>
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </button>
      </form>
      {showResults && (
        <SearchResults
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
