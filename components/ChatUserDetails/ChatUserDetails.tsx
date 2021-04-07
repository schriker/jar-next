import React from 'react';
import { useTypedSelector } from 'store/rootReducer';
import styles from 'components/ChatUserDetails/ChatUserDetails.module.css';
import useSelectedAuhtorData from 'hooks/useSelectedAuthorData';
import moment from 'moment';

moment.locale('pl');

const ChatUserDetails = () => {
  const selectedAuthor = useTypedSelector(
    (state) => state.appChat.selectedAuthor
  );
  const { author, isLoading } = useSelectedAuhtorData(selectedAuthor);

  return !!selectedAuthor.length ? (
    <div className={styles.wrapper}>
      {isLoading ? (
        <div className={styles.loading}></div>
      ) : !author?.length ? (
        <div>{selectedAuthor}</div>
      ) : (
        <>
          <div>{author[0].name}</div>
          <p>
            Użytkownik od:{' '}
            {moment(author[0].created_at).format('DD MMMM YYYY, HH:mm:ss')}
          </p>
        </>
      )}
    </div>
  ) : null;
};

export default ChatUserDetails;
