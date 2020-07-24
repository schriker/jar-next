import { TwitchGame } from 'types/twitch';

export type Streamer = {
  id: string;
  login: string;
  displayName: string;
  profileImage: string;
  isLive: boolean;
  gameId?: string;
  title?: string;
  viewers?: number;
  startedAt?: string;
  game?: TwitchGame;
};
