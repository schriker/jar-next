import React, { useState, useEffect } from 'react';
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
  const [items, setItems] = useState<NoteType[]>([note]);
  const transition = useTransition(items, null, {
    from: { opacity: 0, height: 0 },
    //@ts-expect-error
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
      {transition.map(
        ({ item, props }) =>
          item && (
            <animated.div
              className={styles.container}
              style={props}
              key={note.uuid}
            >
              <div
                className={styles.wrapper}
                ref={(ref) => ref && refMap.set(item, ref)}
              >
                <span className={styles.author}>{note.author}</span>:{' '}
                <span className={styles.message}>
                  {messageParser(note.body, emoticons).map((part, index) => (
                    <ChatMessageComponent
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
