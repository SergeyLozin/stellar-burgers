import store from './store';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import feedReducer from './slices/feedSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import authReducer from './slices/authSlice';
import profileOrdersReducer from './slices/profileOrdersSlice';
import orderDetailsReducer from './slices/orderDetailsSlice';

describe('rootReducer', () => {
  it('должен возвращать корректное начальное состояние при неизвестном экшене', () => {
    const fakeAction = { type: 'UNKNOWN_ACTION' };
    const state = store.getState();
    
    // Проверяем, что состояние имеет правильную структуру
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('profileOrders');
    expect(state).toHaveProperty('orderDetails');
    
    // Проверяем, что редьюсеры вернули своё начальное состояние
    expect(state.burgerConstructor).toEqual(burgerConstructorReducer(undefined, fakeAction));
    expect(state.feed).toEqual(feedReducer(undefined, fakeAction));
    expect(state.ingredients).toEqual(ingredientsReducer(undefined, fakeAction));
    expect(state.auth).toEqual(authReducer(undefined, fakeAction));
    expect(state.profileOrders).toEqual(profileOrdersReducer(undefined, fakeAction));
    expect(state.orderDetails).toEqual(orderDetailsReducer(undefined, fakeAction));
  });
});