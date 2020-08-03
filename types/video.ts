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
  views: number;
  duration: string;
  thumbnail: string;
  started: string;
  createdAt?: string;
  screenshots?: string[];
  source?: VideoSource[];
  score?: number;
  keywords?: string;
  highLights?: VideoHighLight[];
};
