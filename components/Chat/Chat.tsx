import React, { useState } from 'react';
import { useTypedSelector } from 'store/rootReducer';
import { toggleOptions } from 'store/slices/appChat';
import { useDispatch } from 'react-redux';
import styles from 'components/Chat/Chat.module.css';
import { Video } from 'types/video';
import ChatInput from 'components/Chat/ChatInput';
import Shadow from 'components/Shadow/Shadow';
import ChatContent from 'components/Chat/ChatContent';
import ChatOptions from 'components/Chat/ChatOptions';
import useChatIconsData from 'hooks/useChatIconsData';
import ChatLive from 'components/Chat/ChatLive';

type ChatPropsType = {
  video: Video;
};

const Chat = ({ video }: ChatPropsType) => {
  const dispatch = useDispatch();
  const [isLiveChat, setIsLiveChat] = useState<boolean>(false);
  const chat = useTypedSelector((state) => state.appChat);
  const iconsData = useChatIconsData();

  return (
    <div className={styles.wrapper}>
      <Shadow
        isOpen={chat.showOptions}
        onClick={() => dispatch(toggleOptions())}
        absolute
      />
      {isLiveChat ? <ChatLive /> : <ChatContent video={video} {...iconsData} />}
      <ChatOptions isLiveCaht={isLiveChat} setIsLiveChat={setIsLiveChat} />
      <ChatInput emoticons={iconsData.emoticons} video={video.id} />
    </div>
  );
};

export default Chat;
