import { useDispatch } from 'react-redux';
import {
  addWatched,
  addBookmarked,
  removeWatched,
  removeBookmarked,
} from 'store/slices/appData';
import { useTypedSelector } from 'store/rootReducer';

const useWatched = (id: string) => {
  const dispatch = useDispatch();
  const app = useTypedSelector((state) => state.appData);
  const isWatched = app.client.watched.includes(id);
  const isBookmarked = app.client.bookmarksId.includes(id);

  const addToBookark = (event: React.MouseEvent) => {
    event.preventDefault();
    if (isBookmarked) {
      dispatch(removeBookmarked(id));
    } else {
      dispatch(addBookmarked(id));
    }
  };
  const addToWatched = (event: React.MouseEvent) => {
    event.preventDefault();
    if (isWatched) {
      dispatch(removeWatched(id));
    } else {
      dispatch(addWatched(id));
    }
  };

  return {
    isWatched,
    isBookmarked,
    addToBookark,
    addToWatched,
  };
};

export default useWatched;
