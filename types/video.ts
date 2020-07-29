export type VideoHighLight = {
  time: string;
  percent: number;
  highLightsCount: number;
  totalMessagesCount: number;
  type: string;
};

export type Video = {
  _id: string;
  title: string;
  url?: string;
  views: number;
  duration: string;
  thumbnail: string;
  started: string;
  screenShots?: string[];
  facebookId?: string;
  twitchId?: string;
  youTubeId?: string;
  score?: number;
  highLights?: VideoHighLight[];
};
