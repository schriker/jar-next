import React from 'react';
// @ts-ignore
import ircf from 'irc-formatting';
import Tooltip from '@material-ui/core/Tooltip';
import { ChatMessageComponentType } from 'types/message';
import styles from 'components/Chat/ChatMessageComponent.module.css';

type ChatMessageComponentPropsType = {
  part: ChatMessageComponentType;
  tooltipContainer: HTMLDivElement | null;
  handleAuthorClick: (e: React.MouseEvent, author: string) => void;
};

const ChatMessageComponent = ({
  part,
  tooltipContainer,
  handleAuthorClick,
}: ChatMessageComponentPropsType) => {
  return (
    <>
      {part.type === 'text' ? (
        <>
          <span
            dangerouslySetInnerHTML={{ __html: ircf.renderHtml(part.body) }}
          ></span>
        </>
      ) : part.type === 'chatUser' ? (
        <span
          onClick={(e) => handleAuthorClick(e, part.body.trim())}
          className={styles.chatUser}
        >
          {part.body.trim()}
        </span>
      ) : (
        <Tooltip
          title={part.value}
          placement="top"
          arrow
          PopperProps={{ container: tooltipContainer }}
        >
          <div
            className={styles.emoticon}
            dangerouslySetInnerHTML={{ __html: part.body }}
          ></div>
        </Tooltip>
      )}
    </>
  );
};

export default ChatMessageComponent;
