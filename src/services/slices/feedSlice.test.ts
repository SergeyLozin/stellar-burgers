import feedReducer, { fetchFeeds } from './feedSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Заказ 1',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 12345,
    ingredients: ['ingredient1', 'ingredient2']
  }
];

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  describe('редьюсеры', () => {
    it('должен возвращать начальное состояние', () => {
      expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('асинхронные экшены', () => {
    it('должен обрабатывать pending состояние fetchFeeds', () => {
      const action = { type: fetchFeeds.pending.type };
      const state = feedReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен обрабатывать fulfilled состояние fetchFeeds', () => {
      const action = {
        type: fetchFeeds.fulfilled.type,
        payload: {
          orders: mockOrders,
          total: 100,
          totalToday: 10,
          success: true
        }
      };
      const state = feedReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.total).toBe(100);
      expect(state.totalToday).toBe(10);
    });

    it('должен обрабатывать rejected состояние fetchFeeds', () => {
      const errorMessage = 'Ошибка загрузки ленты заказов';
      const action = {
        type: fetchFeeds.rejected.type,
        payload: errorMessage
      };
      const state = feedReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});