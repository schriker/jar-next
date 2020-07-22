import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import styles from './Pagination.module.css';

type NaviPropsType = {
  isActive: boolean;
};

const Navi = styled.li<NaviPropsType>`
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? '#F00' : '#2C2C2C')};
  width: 30px;
  height: 30px;
  margin-right: 15px;
  transition: all ease 0.1s;
  &:hover {
    background-color: #f00;
  }
`;

type PaginationPropsType = {
  count: number;
};

const Pagination = ({ count }: PaginationPropsType) => {
  const router = useRouter();
  const currentPage = router.query.page
    ? parseInt(router.query.page as string)
    : 1;
  const [goToFirst, setGoToFirst] = useState<boolean>(false);
  const [goToLast, setGoToLast] = useState<boolean>(false);
  const [firstPage, setFirstPage] = useState(currentPage);
  const totalPages = Math.ceil(count / 20);
  const pagesToShow = 6;

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
    <div className={styles.wrapper}>
      <ul>
        {goToFirst && (
          <Navi isActive={false}>
            <Link
              href="/[streamer]/page/[page]"
              as={`/${router.query.streamer}/page/1`}
            >
              <a>
                <FontAwesomeIcon className={styles.icon} icon={faBackward} />
              </a>
            </Link>
          </Navi>
        )}
        {[...Array(pagesToShow + 1)].map((_, index) => {
          return (
            <Navi key={index} isActive={index + firstPage === currentPage}>
              <Link
                href="/[streamer]/page/[page]"
                as={`/${router.query.streamer}/page/${index + firstPage}`}
              >
                <a>{index + firstPage}</a>
              </Link>
            </Navi>
          );
        })}
        {goToLast && (
          <Navi isActive={false}>
            <Link
              href="/[streamer]/page/[page]"
              as={`/${router.query.streamer}/page/${totalPages}`}
            >
              <a>
                <FontAwesomeIcon className={styles.icon} icon={faForward} />
              </a>
            </Link>
          </Navi>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
