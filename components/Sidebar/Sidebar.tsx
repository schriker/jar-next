import React, { useState } from 'react';
import useViewWidth from 'hooks/useViewWidth';
import styles from 'components/Sidebar/Sidebar.module.css';
import { useSpring, animated } from 'react-spring';
import SidebarItem from 'components/Sidebar/SidebarItem';
import Shadow from 'components/Shadow/Shadow';
import { useTypedSelector } from 'store/rootReducer';
import AddStreamer from 'components/AddStreamer/AddStreamer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQuestion,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';
import SimpleBar from 'simplebar-react';
import AddVideo from 'components/AddVideo/AddVideo';
import NewVideo from 'components/NewVideo/NewVideo';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const viewWitdh = useViewWidth();

  const slideIn = useSpring({
    width: isOpen && viewWitdh > 1290 ? 360 : isOpen ? 280 : 50,
    config: { mass: 1, tension: 160, friction: 22 },
  });

  const { server, client } = useTypedSelector((state) => state.appData);
  const { user } = useTypedSelector((state) => state.appPoorchat);

  return (
    <>
      <Shadow isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <animated.div style={slideIn} className={styles.sidebar}>
        <div className={styles.open}>
          <div
            role="button"
            aria-pressed={isOpen}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.keyCode !== 9) setIsOpen((isOpen) => !isOpen);
            }}
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          >
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              transform={{ rotate: isOpen ? -180 : 0 }}
            />
          </div>
        </div>
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
        <AddStreamer isOpen={isOpen} open={setIsOpen} />
        {/* {user?.isAdmin && <NewVideo />} */}
        <NewVideo />
        <AddVideo />
        <a
          rel="noreferrer"
          className={styles.faq}
          href="https://github.com/schriker/jar-next/blob/master/faq.md"
          target="_blank"
        >
          <FontAwesomeIcon icon={faQuestion} />
        </a>
      </animated.div>
    </>
  );
};

export default Sidebar;
