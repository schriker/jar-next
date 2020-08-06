import React, { useMemo } from 'react';
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
  const id = useMemo(() => uuidv4(), []);
  return (
    <>
      <Tooltip id={id} />
      {part.type === 'text' ? (
        <span
          dangerouslySetInnerHTML={{ __html: ircf.renderHtml(part.body) }}
        ></span>
      ) : (
        <>
          <span
            className={styles.emoticon}
            data-tip={part.value}
            data-for={id}
            dangerouslySetInnerHTML={{ __html: part.body }}
          ></span>
        </>
      )}
    </>
  );
};

export default ChatMessageComponent;
