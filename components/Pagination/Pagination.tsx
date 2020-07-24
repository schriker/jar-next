import React from 'react';
import styles from 'components/Pagination/Pagination.module.css';
import PaginationPages from 'components/Pagination/PaginationPages';
import PaginationTwitch from 'components/Pagination/PaginationTwitch';

type PaginationPropsType = {
  count: number;
  paginationCursor: string;
};

const Pagination = ({ count, paginationCursor }: PaginationPropsType) => {
  return (
    <div className={styles.wrapper}>
      {!!count ? (
        <PaginationPages count={count} />
      ) : (
        <PaginationTwitch paginationCursor={paginationCursor} />
      )}
    </div>
  );
};

export default Pagination;
