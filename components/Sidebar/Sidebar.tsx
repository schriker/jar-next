import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setClientStreamers } from '../../store/slices/appData';
import styles from './Sidebar.module.css';
import { useSpring, animated } from 'react-spring';
import SidebarItem from './SidebarItem';
import Shadow from '../Shadow/Shadow';
import { Streamer } from '../../types/streamer';
import { fetchStreamersData } from '../../helpers/api';
import { useTypedSelector } from '../../store/rootReducer';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const slideIn = useSpring({
    width: isOpen ? 360 : 60,
    delay: 200,
  });

  const {
    server: { streamersData: serverStreamers },
    client,
  } = useTypedSelector((state) => state.appData);

  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [isfetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchClientStreamers = async () => {
      setIsFetching(true);
      const response = await fetchStreamersData(client.streamers);
      setStreamers(response);
      dispatch(setClientStreamers(response));
      setIsFetching(false);
    };
    if (client.streamers.length) {
      fetchClientStreamers();
    }
  }, [client.streamers]);
  return (
    <>
      <Shadow delay={200} isOpen={isOpen} />
      <animated.div
        style={slideIn}
        className={styles.sidebar}
        onMouseOver={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {serverStreamers.map((streamer) => {
          return (
            <SidebarItem
              isOpen={isOpen}
              isServerSide
              key={streamer.id}
              streamer={streamer}
            />
          );
        })}
        {isfetching && <SidebarItem isOpen={isOpen} />}
        {streamers.map((streamer) => {
          return (
            <SidebarItem
              isOpen={isOpen}
              key={streamer.id}
              streamer={streamer}
            />
          );
        })}
      </animated.div>
    </>
  );
};

export default Sidebar;
