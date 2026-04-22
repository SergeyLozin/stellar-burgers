import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  clearConstructor,
  closeOrderModal,
  sendOrder
} from './burgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

const mockIngredient: TConstructorIngredient = {
  _id: '1',
  id: 'test-id-1',
  name: 'Тестовый ингредиент',
  type: 'main',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 100,
  image: 'test.jpg',
  image_large: 'test-large.jpg',
  image_mobile: 'test-mobile.jpg'
};

const mockBun: TConstructorIngredient = {
  ...mockIngredient,
  _id: '2',
  id: 'test-id-2',
  name: 'Тестовая булка',
  type: 'bun'
};

describe('burgerConstructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: [],
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  describe('редьюсеры', () => {
    it('должен возвращать начальное состояние', () => {
      expect(burgerConstructorReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('должен добавлять ингредиент (не булку)', () => {
      const newState = burgerConstructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      expect(newState.ingredients).toHaveLength(1);
      expect(newState.ingredients[0]).toEqual(mockIngredient);
    });

    it('должен добавлять булку (заменять существующую)', () => {
      let state = burgerConstructorReducer(initialState, addIngredient(mockBun));
      expect(state.bun).toEqual(mockBun);

      const newBun = { ...mockBun, _id: '3', name: 'Новая булка' };
      state = burgerConstructorReducer(state, addIngredient(newBun));
      expect(state.bun).toEqual(newBun);
    });

    it('должен удалять ингредиент по id', () => {
      let state = burgerConstructorReducer(initialState, addIngredient(mockIngredient));
      expect(state.ingredients).toHaveLength(1);

      state = burgerConstructorReducer(state, removeIngredient(mockIngredient.id));
      expect(state.ingredients).toHaveLength(0);
    });

    it('должен очищать конструктор', () => {
      let state = burgerConstructorReducer(initialState, addIngredient(mockBun));
      state = burgerConstructorReducer(state, addIngredient(mockIngredient));
      expect(state.bun).not.toBeNull();
      expect(state.ingredients).toHaveLength(1);

      state = burgerConstructorReducer(state, clearConstructor());
      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });

    it('должен закрывать модальное окно заказа', () => {
      let state = burgerConstructorReducer(initialState, { type: 'unknown' });
      expect(state.orderModalData).toBeNull();
    });
  });

  describe('асинхронные экшены', () => {
    it('должен обрабатывать pending состояние sendOrder', () => {
      const action = { type: sendOrder.pending.type };
      const state = burgerConstructorReducer(initialState, action);
      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен обрабатывать rejected состояние sendOrder', () => {
      const errorMessage = 'Ошибка оформления заказа';
      const action = {
        type: sendOrder.rejected.type,
        payload: errorMessage
      };
      const state = burgerConstructorReducer(initialState, action);
      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});