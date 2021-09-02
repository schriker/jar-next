import { type } from 'os';

export type PoorchatUser = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export type PoorchatSubscription = {
  id: number;
  channel_id: number;
  user_id: number;
  months: number;
  months_streak: number;
  ends_at: string;
  created_at: string;
};

export type PoorchatBlockedUser = {
  id: number;
  name: string;
  created_at: string;
};
