import React from 'react';
// @ts-ignore
import ircf from 'irc-formatting';
import Tooltip from '@material-ui/core/Tooltip';
import { ChatMessageComponentType } from 'types/message';
import styles from 'components/Chat/ChatMessageComponent.module.css';

type ChatMessageComponentPropsType = {
  part: ChatMessageComponentType;
  tooltipContainer: HTMLDivElement | null;
};

const ChatMessageComponent = ({
  part,
  tooltipContainer,
}: ChatMessageComponentPropsType) => {
  return (
    <>
      {part.type === 'text' ? (
        <>
          <span
            dangerouslySetInnerHTML={{ __html: ircf.renderHtml(part.body) }}
          ></span>
        </>
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
