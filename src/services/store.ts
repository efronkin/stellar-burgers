import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './features/ingredientsSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientDetailsReducer } from './features/ingredientDetailsSlice';
import { burgerConstructorReducer } from './features/burgerConstructorSlice';
import { authReducer } from './features/authSlice';
import { feedReducer } from './features/feedsSlice';
import { orderReducer } from './features/ordersSlice';
import { orderDetailsReducer } from './features/orderDetailsSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  auth: authReducer,
  feed: feedReducer,
  orders: orderReducer,
  orderDetails: orderDetailsReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
