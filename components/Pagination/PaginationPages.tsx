import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import StyledNavi from 'components/Pagination/StyledNavi';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import styles from 'components/Pagination/PaginationPages.module.css';

type PaginationPagesPropsType = {
  count: number;
};

const PaginationPages = ({ count }: PaginationPagesPropsType) => {
  const router = useRouter();
  const currentPage = router.query.page
    ? parseInt(router.query.page as string)
    : 1;
  const [goToFirst, setGoToFirst] = useState<boolean>(false);
  const [goToLast, setGoToLast] = useState<boolean>(false);
  const [firstPage, setFirstPage] = useState(currentPage);
  const totalPages = Math.ceil(count / 20);
  const pagesToShow = 4;

  useEffect(() => {
    if (
      currentPage > pagesToShow / 2 &&
      !(totalPages - currentPage < pagesToShow / 2)
    ) {
      setFirstPage(currentPage - pagesToShow / 2);
      setGoToFirst(true);
      setGoToLast(true);
    } else if (currentPage <= pagesToShow / 2) {
      setFirstPage(1);
      setGoToFirst(false);
      setGoToLast(true);
    } else if (totalPages - currentPage < pagesToShow / 2) {
      setFirstPage(totalPages - pagesToShow);
      setGoToFirst(true);
      setGoToLast(false);
    }
  }, [currentPage]);

  return (
    <ul>
      {goToFirst && (
        <StyledNavi fixedWidth isActive={false}>
          <Link
            href="/[streamer]/page/[page]"
            as={`/${router.query.streamer}/page/1`}
          >
            <a>
              <FontAwesomeIcon className={styles.icon} icon={faBackward} />
            </a>
          </Link>
        </StyledNavi>
      )}
      {[...Array(pagesToShow + 1)].map((_, index) => {
        return (
          <StyledNavi fixedWidth key={index} isActive={index + firstPage === currentPage}>
            <Link
              href="/[streamer]/page/[page]"
              as={`/${router.query.streamer}/page/${index + firstPage}`}
            >
              <a>{index + firstPage}</a>
            </Link>
          </StyledNavi>
        );
      })}
      {goToLast && (
        <StyledNavi fixedWidth isActive={false}>
          <Link
            href="/[streamer]/page/[page]"
            as={`/${router.query.streamer}/page/${totalPages}`}
          >
            <a>
              <FontAwesomeIcon className={styles.icon} icon={faForward} />
            </a>
          </Link>
        </StyledNavi>
      )}
    </ul>
  );
};

export default PaginationPages;
