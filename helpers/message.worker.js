let messageInterval
let timeInterval
const intervalNumber = 500

onmessage = ({ data }) => {
  const intervalFunction = () => {
    if (data.fetched.length === 0 && data.messages.length !== 0) {
      postMessage({
        type: 'FETCH',
        message: data.messages[data.messages.length - 1]
      })
      clearInterval(messageInterval)
    }
    
    const messagesInView = data.fetched.filter((message) => {
      const condition = new Date(message.createdAt).getTime() < new Date(data.startTime).getTime()
      return condition
    })
    if (messagesInView.length) {
      postMessage({
        type: 'ADD_MESSAGE',
        message: messagesInView
      })

      data.fetched = data.fetched.filter((oldMessage) => {
        return !messagesInView.some(message => {
          return message._id === oldMessage._id
        })
      })
    }
    data.startTime = new Date(new Date(data.startTime).getTime() + 1 * data.playbackRate * intervalNumber)
    timeInterval = setTimeout(intervalFunction, intervalNumber);
  }

  switch (data.type) {
    case 'START':
      intervalFunction()
      break
    case 'STOP':
      clearTimeout(timeInterval)
      break
  }
}

onerror = (error) => {
  console.log('Chat worker:', error)
}
