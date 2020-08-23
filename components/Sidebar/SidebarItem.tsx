import React, { useState } from 'react';
import { removeClientStreamer } from 'store/slices/appData';
import { useDispatch } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import Link from 'next/link';
import trimString from 'helpers/trimString';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import styles from 'components/Sidebar/SidebarItem.module.css';
import { Streamer } from 'types/streamer';
import Tooltip from '@material-ui/core/Tooltip';

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
  height: 50px;
  align-items: center;
  border-left: 3px solid ${(props) => (props.isActive ? '#F00' : 'transparent')};
  background-color: ${(props) => (props.isActive ? '#232323' : 'transparent')};
  transition: all ease 0.2s;
  &:hover {
    cursor: pointer;
    background-color: #232323;
  }
  @media (max-width: 1290px) {
    width: 280px;
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
  const dispatch = useDispatch();
  const fadeIn = useSpring({ opacity: loaded ? 1 : isServerSide ? 1 : 0 });
  const slideIn = useSpring({
    opacity: isOpen ? 1 : 0,
    config: {
      duration: 200,
    },
  });

  const onRemove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (streamer) {
      dispatch(removeClientStreamer(streamer.login));
    }
  };

  return !streamer ? (
    <ItemAnchor isActive={false} className={styles.wrapper}>
      <div className={styles.sidebarItem}></div>
    </ItemAnchor>
  ) : (
    <Link href="/[streamer]" as={`/${streamer.login}`}>
      <ItemAnchor
        isActive={router.query.streamer === streamer.login}
        className={styles.wrapper}
      >
        <div className={styles.sidebarItem}>
          <animated.div style={fadeIn}>
            <img
              onLoad={() => setLoaded(true)}
              width="32"
              height="32"
              src={streamer.profileImage}
            />
            <StatusIcon centerVertical={false} isLive={streamer.isLive} />
          </animated.div>
        </div>
        <animated.div style={slideIn} className={styles.content}>
          <div className={styles.name}>
            <div>{trimString(streamer.displayName, 15)}</div>
            {streamer.game && (
              <div className={styles.gameName}>
                {trimString(streamer.game.name, 15)}
              </div>
            )}
          </div>
          {!isServerSide && (
            <Tooltip title="Usuń" arrow placement="top">
              <div onClick={onRemove} className={styles.remove}>
                x
              </div>
            </Tooltip>
          )}
          <div className={styles.status}>
            <StatusIcon centerVertical={true} isLive={streamer.isLive} />{' '}
            {streamer.isLive ? streamer.viewers : 'offline'}
          </div>
        </animated.div>
      </ItemAnchor>
    </Link>
  );
};

export default SidebarItem;
