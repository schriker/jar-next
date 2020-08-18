import React, { useEffect } from 'react';
import { useTypedSelector } from 'store/rootReducer';
import { fetchNotes } from 'helpers/api';
import { Video } from 'types/video';
import { NoteType } from 'types/notes';
import useChatWorker from 'hooks/useChatWorker';
import styles from 'components/Notes/Notes.module.css';
import Note from 'components/Notes/Note';
import useChatIconsData from 'hooks/useChatIconsData';

type NotesPropsType = {
  video: Video;
};

const Notes = ({ video }: NotesPropsType) => {
  const fetch = (_: string | number, timestamp: number) => {
    return fetchNotes(video.id, timestamp);
  };
  const chat = useTypedSelector((state) => state.appChat);
  const { emoticons } = useChatIconsData();
  const { messages, setMessages } = useChatWorker<NoteType>({
    fetch,
    video,
    isNote: true,
  });

  useEffect(() => {
    if (chat.userNote) {
      setMessages((messages) => {
        if (chat.userNote) {
          return [...messages, chat.userNote];
        } else {
          return [...messages];
        }
      });
    }
  }, [chat.userNote]);

  return (
    <div className={styles.wrapper}>
      {messages.map((message) => (
        <Note emoticons={emoticons} note={message} key={message.uuid} />
      ))}
    </div>
  );
};

export default Notes;
