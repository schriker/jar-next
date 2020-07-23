import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Link from 'next/link';
import trimString from '../../helpers/trimString';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import style from './SidebarItem.module.css';
import { Streamer } from '../../types/streamer';

type SidebarItemProps = {
  isOpen: boolean;
  streamer?: Streamer;
  isServerSide?: boolean;
};

type StatusIconProps = {
  isLive: boolean;
  centerVertical: boolean;
};

type ItemAnchorProps = {
  isActive: boolean;
};

const ItemAnchor = styled.a<ItemAnchorProps>`
  display: flex;
  width: 360px;
  padding: 8px 0 8px 9px;
  border-left: 3px solid ${(props) => (props.isActive ? '#F00' : 'transparent')};
  background-color: ${(props) => (props.isActive ? '#232323' : 'transparent')};
  transition: all ease 0.2s;
  &:hover {
    cursor: pointer;
    background-color: #232323;
  }
`;
const StatusIcon = styled.div<StatusIconProps>`
  position: absolute;
  right: 0;
  bottom: ${(props) => (props.centerVertical ? '50%' : '0')};
  width: 11px;
  height: 11px;
  border-radius: 50%;
  border: 2px solid #1c1c1c;
  transform: ${(props) =>
    props.centerVertical ? 'translateY(50%)' : 'translateY(0)'};
  background-color: ${(props) => (props.isLive ? '#2CEA0E' : '#F00')};
`;

const SidebarItem = ({ streamer, isServerSide, isOpen }: SidebarItemProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const router = useRouter();
  const fadeIn = useSpring({ opacity: loaded ? 1 : isServerSide ? 1 : 0 });
  const slideIn = useSpring({
    opacity: isOpen ? 1 : 0,
  });
  return !streamer ? (
    <ItemAnchor isActive={false} className={style.wrapper}>
      <div className={style.sidebarItem}></div>
    </ItemAnchor>
  ) : (
    <Link href="/[streamer]" as={`/${streamer.login}`}>
      <ItemAnchor
        isActive={router.query.streamer === streamer.login}
        className={style.wrapper}
      >
        <div className={style.sidebarItem}>
          <animated.div style={fadeIn}>
            <img
              onLoad={() => setLoaded(true)}
              width="35"
              height="35"
              src={streamer.profileImage}
            />
            <StatusIcon centerVertical={false} isLive={streamer.isLive} />
          </animated.div>
        </div>
        <animated.div style={slideIn} className={style.content}>
          <div>
            <div>{streamer.displayName}</div>
            {streamer.game && (
              <div className={style.gameName}>
                {trimString(streamer.game.name, 25)}
              </div>
            )}
          </div>
          <div className={style.status}>
            <StatusIcon centerVertical={true} isLive={streamer.isLive} />{' '}
            {streamer.isLive ? streamer.viewers : 'offline'}
          </div>
        </animated.div>
      </ItemAnchor>
    </Link>
  );
};

export default SidebarItem;
