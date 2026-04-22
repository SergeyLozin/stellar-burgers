import orderDetailsReducer, { fetchOrderByNumber, clearOrderDetails } from './orderDetailsSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Тестовый заказ',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  number: 12345,
  ingredients: ['ingredient1', 'ingredient2']
};

describe('orderDetailsSlice', () => {
  const initialState = {
    order: null,
    isLoading: false,
    error: null
  };

  describe('редьюсеры', () => {
    it('должен возвращать начальное состояние', () => {
      expect(orderDetailsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('должен очищать детали заказа', () => {
      const stateWithOrder = {
        order: mockOrder,
        isLoading: false,
        error: null
      };
      const newState = orderDetailsReducer(stateWithOrder, clearOrderDetails());
      expect(newState.order).toBeNull();
      expect(newState.error).toBeNull();
    });
  });

  describe('асинхронные экшены', () => {
    it('должен обрабатывать pending состояние fetchOrderByNumber', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const state = orderDetailsReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен обрабатывать fulfilled состояние fetchOrderByNumber', () => {
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockOrder
      };
      const state = orderDetailsReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.order).toEqual(mockOrder);
    });

    it('должен обрабатывать rejected состояние fetchOrderByNumber', () => {
      const errorMessage = 'Ошибка загрузки заказа';
      const action = {
        type: fetchOrderByNumber.rejected.type,
        payload: errorMessage
      };
      const state = orderDetailsReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});