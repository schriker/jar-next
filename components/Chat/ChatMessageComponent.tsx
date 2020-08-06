import React from 'react';
// @ts-ignore
import ircf from 'irc-formatting';
import Tooltip from 'components/Tooltip/Tooltip';
import { ChatMessageComponentType } from 'types/message';
import styles from 'components/Chat/ChatMessageComponent.module.css';
import { v4 as uuidv4 } from 'uuid';

type ChatMessageComponentPropsType = {
  part: ChatMessageComponentType;
};

const ChatMessageComponent = ({ part }: ChatMessageComponentPropsType) => {
  const id = uuidv4();
  return (
    <>
      {part.type === 'text' ? (
        <>
          <Tooltip id={id} />
          <span
            dangerouslySetInnerHTML={{ __html: ircf.renderHtml(part.body) }}
          ></span>
        </>
      ) : (
        <>
          <Tooltip id={id} />
          <div
            className={styles.emoticon}
            data-tip={part.value}
            data-for={id}
            dangerouslySetInnerHTML={{ __html: part.body }}
          ></div>
        </>
      )}
    </>
  );
};

export default ChatMessageComponent;
