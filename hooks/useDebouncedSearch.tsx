import { useState } from 'react';
import useConstant from 'use-constant';
import { useAsync } from 'react-async-hook';
import { useTypedSelector } from 'store/rootReducer';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const useDebouncedSearch = (searchFunction: any) => {
  const [inputText, setInputText] = useState('');
  const state = useTypedSelector((state) => state.appData);
  const watched = state.server.hideWatched ? state.client.watched : [];

  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(searchFunction, 500)
  );

  const searchResults = useAsync(async () => {
    if (inputText.length < 3) {
      return [];
    } else {
      return debouncedSearchFunction(inputText, watched);
    }
  }, [debouncedSearchFunction, inputText, state.server.hideWatched]);

  return {
    inputText,
    setInputText,
    searchResults,
  };
};

export default useDebouncedSearch;
