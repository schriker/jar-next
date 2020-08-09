import emojisArray from 'helpers/emojis';
import linkifyHtml from 'linkifyjs/html';
import replaceTag from 'helpers/escapeTags';
import { ChatEmoticon, ChatMessageComponentType } from 'types/message';

declare global {
  interface Window {
    twemoji: any;
  }
}

export const messageParser = (
  messageToParse: string,
  emoticons: ChatEmoticon[]
) => {
  let messageComponents: ChatMessageComponentType[] = [];
  let message = linkifyHtml(messageToParse.replace(/[&<>]/g, replaceTag), {
    defaultProtocol: 'https',
  });

  message = message.replace('\u0001ACTION', '');
  const messageParts = message.split(' ');

  for (let part of messageParts) {
    messageComponents = [
      ...messageComponents,
      ...messagePartsParser(part, emoticons),
    ];
  }

  return messageComponents.reduce(
    parserReducer,
    []
  ) as ChatMessageComponentType[];
};

const messagePartsParser = (part: string, emoticons: ChatEmoticon[]) => {
  const emojiRegex = new RegExp(/:(\D\d|\w*?):/, 'g');

  if (emojiRegex.test(part)) {
    const emojis = [];
    const shortCodes = part.split(':');
    for (let shortCode of shortCodes) {
      if (shortCode.length > 0) {
        const emoji = emojisArray.filter((el: any) =>
          el.shortcodes.includes(shortCode)
        );
        if (emoji.length === 0) {
          emojis.push({
            type: 'text',
            value: shortCode,
            body: shortCode,
          });
        } else if (window.twemoji) {
          emojis.push({
            type: 'emoji',
            value: `:${shortCode}:`,
            body: window.twemoji.parse(emoji[0].emoji),
          });
        }
      }
    }
    return emojis;
  }

  for (const emoticon of emoticons) {
    const emoticonRegex = new RegExp('\\b' + emoticon.name + '\\b', 'g');
    if (emoticonRegex.test(part)) {
      return [
        {
          type: 'emoticon',
          value: part,
          body: `<img width="28px" height="28px" src="https://static.poorchat.net/emoticons/${emoticon.file}/1x" srcset="https://static.poorchat.net/emoticons/${emoticon.file}/1x, https://static.poorchat.net/emoticons/${emoticon.file}/2x 1.25x, https://static.poorchat.net/emoticons/${emoticon.file}/4x 2.25x" />`,
        },
      ];
    }
  }

  return [
    {
      type: 'text',
      value: part,
      body: part,
    },
  ];
};

const parserReducer = (acc: any, obj: any) => {
  if (acc.length === 0) {
    return [obj];
  } else if (acc[acc.length - 1].type === 'text' && obj.type === 'text') {
    acc[acc.length - 1].body = `${acc[acc.length - 1].body} ${obj.body}`;
    return [...acc];
  } else {
    acc[acc.length - 1].body = `${acc[acc.length - 1].body} `;
    return [...acc, obj];
  }
};
