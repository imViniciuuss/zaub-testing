import { cartReducer } from '@/features/cart/cartSlice';
import { ordersReducer } from '@/features/orders/ordersSlice';
import { productsApi } from '@/features/products/productsApi';
import { configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware } from './listenerMiddleware';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      orders: ordersReducer,
      [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        productsApi.middleware,
        listenerMiddleware.middleware,
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
