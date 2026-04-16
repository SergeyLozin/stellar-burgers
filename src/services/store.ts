// src/services/store.ts
import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsReducer from './slices/ingredientsSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import authReducer from './slices/authSlice';
import feedReducer from './slices/feedSlice';
import profileOrdersReducer from './slices/profileOrdersSlice';
import orderDetailsReducer from './slices/orderDetailsSlice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    auth: authReducer,
    feed: feedReducer,
    profileOrders: profileOrdersReducer,
    orderDetails: orderDetailsReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
