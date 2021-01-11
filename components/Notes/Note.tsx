import React, { useState, useEffect, useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import styles from 'components/Notes/Note.module.css';
import { NoteType } from 'types/notes';
import { ChatEmoticon } from 'types/message';
import { messageParser } from 'helpers/messageParser';
import ChatMessageComponent from 'components/Chat/ChatMessageComponent';

type NotePropsType = {
  note: NoteType;
  emoticons: ChatEmoticon[];
};

const Note = ({ note, emoticons }: NotePropsType) => {
  const [refMap] = useState(() => new WeakMap());
  const tooltipContainer = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState<NoteType[]>([note]);
  const transition = useTransition(items, {
    from: { opacity: 0, height: 0 },
    enter: (item) => async (next) =>
      await next({ opacity: 1, height: refMap.get(item).offsetHeight }),
    leave: { opacity: 0 },
  });

  useEffect(() => {
    setTimeout(() => {
      setItems([]);
    }, 15000);
  });

  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <animated.div
              ref={tooltipContainer}
              className={styles.container}
              style={style as any}
            >
              <div
                className={styles.wrapper}
                ref={(ref) => ref && refMap.set(item, ref)}
              >
                <span className={styles.author}>{note.author}</span>:{' '}
                <span className={styles.message}>
                  {messageParser(note.body, emoticons).map((part, index) => (
                    <ChatMessageComponent
                      tooltipContainer={tooltipContainer.current}
                      key={`${note.uuid}-${index}`}
                      part={part}
                    />
                  ))}
                </span>
              </div>
            </animated.div>
          )
      )}
    </>
  );
};

export default Note;
