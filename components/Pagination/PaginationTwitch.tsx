import React from 'react';
import Link from 'next/link';
import StyledNavi from './StyledNavi';
import { useRouter } from 'next/router';
import qs from 'qs';

type PaginationTwitchPropsType = {
  paginationCursor: string;
};

const PaginationTwitch = ({ paginationCursor }: PaginationTwitchPropsType) => {
  const router = useRouter();
  // console.log(qs.parse(router.asPath));
  return (
    <ul>
      <StyledNavi fixedWidth={false} isActive={false}>
        <Link
          href={`/[streamer]?before=${paginationCursor}`}
          as={`/${router.query.streamer}`}
        >
          <a>Poprzednie</a>
        </Link>
      </StyledNavi>
      <StyledNavi fixedWidth={false} isActive={false}>
        <Link
          href={`/[streamer]?after=${paginationCursor}`}
          as={`/${router.query.streamer}`}
        >
          <a>Nastepne</a>
        </Link>
      </StyledNavi>
    </ul>
  );
};

export default PaginationTwitch;
