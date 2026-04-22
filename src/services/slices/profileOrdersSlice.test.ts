import profileOrdersReducer, { fetchProfileOrders } from './profileOrdersSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Мой заказ 1',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 12345,
    ingredients: ['ingredient1', 'ingredient2']
  },
  {
    _id: '2',
    status: 'pending',
    name: 'Мой заказ 2',
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z',
    number: 12346,
    ingredients: ['ingredient3']
  }
];

describe('profileOrdersSlice', () => {
  const initialState = {
    orders: [],
    isLoading: false,
    error: null
  };

  describe('редьюсеры', () => {
    it('должен возвращать начальное состояние', () => {
      expect(profileOrdersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('асинхронные экшены', () => {
    it('должен обрабатывать pending состояние fetchProfileOrders', () => {
      const action = { type: fetchProfileOrders.pending.type };
      const state = profileOrdersReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен обрабатывать fulfilled состояние fetchProfileOrders', () => {
      const action = {
        type: fetchProfileOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = profileOrdersReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
    });

    it('должен обрабатывать rejected состояние fetchProfileOrders', () => {
      const errorMessage = 'Ошибка загрузки истории заказов';
      const action = {
        type: fetchProfileOrders.rejected.type,
        payload: errorMessage
      };
      const state = profileOrdersReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});