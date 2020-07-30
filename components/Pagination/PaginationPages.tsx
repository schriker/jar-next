import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import qs from 'qs';
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
  const totalPages = Math.ceil(count / 24);
  const pagesToShow = totalPages < 5 ? totalPages - 1 : 4;

  useEffect(() => {
    if (
      currentPage > Math.ceil(pagesToShow / 2) &&
      !(totalPages - currentPage < Math.ceil(pagesToShow / 2))
    ) {
      setFirstPage(Math.ceil(currentPage - pagesToShow / 2));
      setGoToFirst(true);
      setGoToLast(true);
    } else if (currentPage <= Math.ceil(pagesToShow / 2)) {
      setFirstPage(1);
      setGoToFirst(false);
      setGoToLast(true);
    } else if (totalPages - currentPage < Math.ceil(pagesToShow / 2)) {
      setFirstPage(totalPages - pagesToShow);
      setGoToFirst(true);
      setGoToLast(false);
    }
    if (totalPages === 1) {
      setFirstPage(1);
      setGoToFirst(false);
      setGoToLast(false);
    }
  });

  const createPaginationLink = (
    pageNumber: number
  ): { href: string; as: string } => {
    const query = {
      ...router.query
    }
    delete query.streamer;
    delete query.page;
    const queryString = qs.stringify(query);
    if (Object.keys(query).length) {
      return {
        href: `/[streamer]/page/[page]?${queryString}`,
        as: `/${router.query.streamer}/page/${pageNumber}?${queryString}`,
      };
    } else {
      return {
        href: '/[streamer]/page/[page]',
        as: `/${router.query.streamer}/page/${pageNumber}`,
      };
    }
  };

  return (
    <ul>
      {goToFirst && (
        <StyledNavi fixedWidth isActive={false}>
          <Link
            href={createPaginationLink(1).href}
            as={createPaginationLink(1).as}
          >
            <a>
              <FontAwesomeIcon className={styles.icon} icon={faBackward} />
            </a>
          </Link>
        </StyledNavi>
      )}
      {[...Array(pagesToShow + 1)].map((_, index) => {
        const { href, as } = createPaginationLink(index + firstPage);

        return (
          <StyledNavi
            fixedWidth
            key={index}
            isActive={index + firstPage === currentPage}
          >
            <Link href={href} as={as}>
              <a>{index + firstPage}</a>
            </Link>
          </StyledNavi>
        );
      })}
      {goToLast && (
        <StyledNavi fixedWidth isActive={false}>
          <Link
            href={createPaginationLink(totalPages).href}
            as={createPaginationLink(totalPages).as}
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
