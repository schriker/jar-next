import React from 'react';
import { useRouter } from 'next/router';
import useDebouncedSearch from 'hooks/useDebouncedSearch';
import styles from 'components/Search/Search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const useSearch = () =>
  useDebouncedSearch((searchValue: string) => console.log(searchValue));

const Search = () => {
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
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className={styles.searchForm}>
      <input
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
  );
};

export default Search;
