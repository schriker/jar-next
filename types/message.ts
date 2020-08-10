export type ChatMessageType = {
  uuid: string;
  _id: string;
  type: string;
  author: string;
  body: string;
  color: string;
  subscription: number;
  subscriptiongifter: number;
  week_position?: number | null;
  createdAt: string;
};

export type ChatEmoticon = {
  name: string;
  file: string;
  subscribers_only: boolean;
};

export type ChatBadges = {
  subscriber: {
    months: number;
    file: string;
  }[];
};

export type ChatModeBadge = {
  mode: string;
  file: string;
  badges?: { file: string; gifts: number }[];
};

export type ChatUserWithMode = {
  mode: string[];
  user: string;
};

export type ChatMessageComponentType = {
  type: string;
  value: string;
  body: string;
};
