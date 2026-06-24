import { cartReducer } from '@/features/cart/cartSlice';
import { productsApi } from '@/features/products/productsApi';
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () =>
    configureStore({
        reducer: {
            cart: cartReducer,
            [productsApi.reducerPath]: productsApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(productsApi.middleware),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];