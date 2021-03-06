let time;
let timeInterval;
let messageInterval;
const intervalNumber = 100;

onmessage = ({ data }) => {
  const timeIntervalFunction = () => {
    time = new Date(
      new Date(time).getTime() + data.playbackRate * intervalNumber
    );
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
        const condition = message.timestamp * 1000 <= time;
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
      time = data.startTime;
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
  console.log('Note worker:', error);
};