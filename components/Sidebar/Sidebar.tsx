import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useViewWidth from 'hooks/useViewWidth';
import styles from 'components/Sidebar/Sidebar.module.css';
import { useSpring, animated } from 'react-spring';
import SidebarItem from 'components/Sidebar/SidebarItem';
import Shadow from 'components/Shadow/Shadow';
import { useTypedSelector } from 'store/rootReducer';
import AddStreamer from 'components/AddStreamer/AddStreamer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import SimpleBar from 'simplebar-react';
import Spinner from 'components/Spinner/Spinner';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const viewWitdh = useViewWidth();

  const slideIn = useSpring({
    width: isOpen && viewWitdh > 1290 ? 360 : isOpen ? 280 : 50,
  });

  const { server, client } = useTypedSelector((state) => state.appData);

  return (
    <>
      <Shadow isOpen={isOpen} />
      <animated.div
        style={slideIn}
        className={styles.sidebar}
        onMouseOver={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <SimpleBar
          style={{ height: '100%', overflowX: 'hidden' }}
          autoHide={true}
        >
          {server.streamersData.map((streamer) => {
            return (
              <SidebarItem
                isOpen={isOpen}
                isServerSide
                key={streamer.id}
                streamer={streamer}
              />
            );
          })}
          {client.streamersData.map((streamer) => {
            if (!server.streamers.includes(streamer.login)) {
              return (
                <SidebarItem
                  isOpen={isOpen}
                  key={streamer.id}
                  streamer={streamer}
                />
              );
            }
          })}
          {client.isFetching && <SidebarItem isOpen={isOpen} />}
        </SimpleBar>
        <AddStreamer isOpen={isOpen} />
        <a className={styles.faq} href="#" target="_blank">
          <FontAwesomeIcon icon={faQuestion} />
        </a>
      </animated.div>
    </>
  );
};

export default Sidebar;
