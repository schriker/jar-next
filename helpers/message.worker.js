let time;
let timeInterval;
let messageInterval;
const intervalNumber = 250;

onmessage = ({ data }) => {
  const timeIntervalFunction = () => {
    time = time + data.playbackRate * intervalNumber;
    timeInterval = setTimeout(timeIntervalFunction, intervalNumber);
  };

  const intervalFunction = () => {
    if (data.fetched.length === 0 && data.messages.length !== 0) {
      postMessage({
        type: 'FETCH',
        message: data.messages[data.messages.length - 1],
      });
    } else {
      const messagesInView = data.fetched.filter((message) => {
        const condition = new Date(message.createdAt).getTime() < time;
        return condition;
      });
      if (messagesInView.length) {
        postMessage({
          type: 'ADD_MESSAGE',
          message: messagesInView,
        });

        data.fetched = data.fetched.filter((oldMessage) => {
          return !messagesInView.some((message) => {
            return message._id === oldMessage._id;
          });
        });
      }
      messageInterval = setTimeout(intervalFunction, intervalNumber);
    }
  };

  switch (data.type) {
    case 'START':
      time =
        new Date(data.video.started).getTime() + data.playerPosition * 1000;
      clearTimeout(timeInterval);
      clearTimeout(messageInterval);
      intervalFunction();
      timeIntervalFunction();
      break;
    case 'STOP':
      clearTimeout(messageInterval);
      clearTimeout(timeInterval);
      break;
  }
};

onerror = (error) => {
  console.log('Chat worker:', error);
};
