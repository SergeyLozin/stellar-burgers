import { TOrder } from '@utils-types';

export type FeedUIProps = {
  orders: TOrder[];
  handleGetFeeds: () => void;
  total?: number; // 👈 Добавь, если ругается TS
  totalToday?: number;
};
