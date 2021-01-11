import React, { useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import { VideoHighLight } from 'types/video';
import { useTypedSelector } from 'store/rootReducer';
import HighlightsMarker from 'components/Highlights/HighlightsMarker';
import HighlightsBar from 'components/Highlights/HighlightsBar';
import HighlightsTimeline from 'components/Highlights/HighlightsTimeline';
import styles from 'components/Highlights/Highlights.module.css';

type HighlightsPropsType = {
  highlights: VideoHighLight[];
  duration: number;
  started: string;
};

const Highlights = ({ highlights, duration, started }: HighlightsPropsType) => {
  const player = useTypedSelector((state) => state.appPlayer);
  const tooltipContainer = useRef<HTMLDivElement | null>(null);
  const timelineWidth = (player.playerPosition / (duration / 1000)) * 100;
  const transition = useTransition(player.showHighlights, {
    from: { opacity: 0, transform: 'translateY(50px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(50px)' },
  });
  
  const maxCount = Math.max(
    ...highlights.map((highlight) => highlight.totalMessagesCount)
  );

  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <animated.div
              ref={tooltipContainer}
              className={styles.wrapper}
              style={style as any}
            >
              <HighlightsTimeline width={timelineWidth} />
              {[...Array(Math.floor(duration / 1000 / 60 / 2))].map(
                (_, index) => (
                  <HighlightsMarker
                    key={index}
                    index={index}
                    duration={duration}
                  />
                )
              )}
              {highlights.map((highlight) => (
                <HighlightsBar
                  key={highlight.time}
                  started={started}
                  highlight={highlight}
                  duration={duration}
                  max={maxCount}
                  tooltipContainer={tooltipContainer.current}
                />
              ))}
            </animated.div>
          )
      )}
    </>
  );
};

export default Highlights;
