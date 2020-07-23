import React from 'react';
import styles from './Pagination.module.css';
import PaginationPages from './PaginationPages';
import PaginationTwitch from './PaginationTwitch';

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
