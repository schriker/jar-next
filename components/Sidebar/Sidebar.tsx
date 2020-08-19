import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setClientStreamers, removeClientStreamer } from 'store/slices/appData';
import styles from 'components/Sidebar/Sidebar.module.css';
import { useSpring, animated } from 'react-spring';
import SidebarItem from 'components/Sidebar/SidebarItem';
import Shadow from 'components/Shadow/Shadow';
import { Streamer } from 'types/streamer';
import { fetchStreamersData } from 'helpers/api';
import { useTypedSelector } from 'store/rootReducer';
import AddStreamer from 'components/AddStreamer/AddStreamer';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const slideIn = useSpring({
    width: isOpen ? 360 : 50,
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
      if (response.length < client.streamers.length) {
        dispatch(removeClientStreamer(client.streamers[client.streamers.length - 1]))
      }
      setStreamers(response);
      dispatch(setClientStreamers(response));
      setIsFetching(false);
    };
    if (client.streamers.length > streamers.length) {
      fetchClientStreamers();
    } else {
      setStreamers(client.streamersData);
    }
  }, [client.streamers]);
  return (
    <>
      <Shadow isOpen={isOpen} />
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
        {streamers.map((streamer) => {
          return (
            <SidebarItem
              isOpen={isOpen}
              key={streamer.id}
              streamer={streamer}
            />
          );
        })}
        {isfetching && <SidebarItem isOpen={isOpen} />}
        <AddStreamer isOpen={isOpen} />
      </animated.div>
    </>
  );
};

export default Sidebar;
