export type VideoSource = {
  name: string;
  id: string
}

export type VideoHighLight = {
  time: string;
  percent: number;
  highLightsCount: number;
  totalMessagesCount: number;
  type: string;
};

export type Video = {
  id: string;
  title: string;
  url?: string;
  views: number;
  duration: string;
  thumbnail: string;
  started: string;
  screenShots?: string[];
  sources?: VideoSource[];
  score?: number;
  highLights?: VideoHighLight[];
};
