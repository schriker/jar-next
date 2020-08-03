export type TwitchVideoQuery = {
  user_id?: string;
  id?: string;
  before?: string;
  after?: string;
  first?: number;
};

export type ServerVideoQuery = {
  page: number;
  per_page: number;
  streamer: string;
  search?: string;
  date?: string;
};
