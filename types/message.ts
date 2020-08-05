export type ChatMessage = {
  _id: string;
  type: string;
  author: string;
  body: string;
  color: string;
  subscription: number;
  subscriptiongifter: number;
  week_position: number | null;
  createdAt: string;
};
