let messageInterval
let timeInterval

onmessage = ({ data }) => {
  const intervalFunction = () => {
    if (data.fetched.length === 0 && data.messages.length !== 0) {
      postMessage({
        type: 'FETCH',
        message: data.messages[data.messages.length - 1]
      })
      clearInterval(messageInterval)
    }

    const messagesInView = data.fetched.filter((message, index) => {
      const condition = (message.timestamp * 1000) <= data.startTime
      if (condition) {
        data.fetched.splice(index, 1)
      }
      return condition
    })

    for (let message of messagesInView) {
      data.messages.push(message)
      postMessage({
        type: 'ADD_MESSAGE',
        message: message
      })
    }
  }

  const timeFunction = () => {
    data.startTime = data.startTime + 1 * data.playbackRate * 1000
  }

  switch (data.type) {
    case 'START':
      clearInterval(messageInterval)
      clearInterval(timeInterval)
      messageInterval = setInterval(intervalFunction, 1000)
      timeInterval = setInterval(timeFunction, 1000)
      break
    case 'STOP':
      clearInterval(messageInterval)
      clearInterval(timeInterval)
      break
  }
}

onerror = (error) => {
  console.log(error)
}