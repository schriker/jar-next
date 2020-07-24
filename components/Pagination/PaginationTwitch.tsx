import React from 'react';
import Link from 'next/link';
import StyledNavi from 'components/Pagination/StyledNavi';
import { useRouter } from 'next/router';

type PaginationTwitchPropsType = {
  paginationCursor: string;
};

const PaginationTwitch = ({ paginationCursor }: PaginationTwitchPropsType) => {
  const router = useRouter();
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
          <a>Następne</a>
        </Link>
      </StyledNavi>
    </ul>
  );
};

export default PaginationTwitch;
