import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
    addItem,
    clearCart,
    decrement,
    increment,
    removeItem,
} from '@/features/cart/cartSlice';
import { placeOrder } from '@/features/orders/ordersSlice';
import { saveCartState, saveOrdersState } from './persistedState';
import type { RootState } from './index';


export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(addItem, increment, decrement, removeItem, clearCart),
    effect: (_action, listenerApi) => {
        const { cart } = listenerApi.getState() as RootState;
        saveCartState(cart);
    },
});

listenerMiddleware.startListening({
    actionCreator: placeOrder,
    effect: (_action, listenerApi) => {
      const { orders } = listenerApi.getState() as RootState;
      saveOrdersState(orders);
    },
  });