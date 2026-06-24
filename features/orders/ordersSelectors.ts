import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { ordersAdapter } from './ordersSlice';

const orderSelectors = ordersAdapter.getSelectors((state: RootState) => state.orders);

export const selectAllOrders = orderSelectors.selectAll;

export const selectOrderById = (orderId: string) => (state: RootState) =>
  orderSelectors.selectById(state, orderId);

export const selectOrdersCount = createSelector(selectAllOrders, (orders) => orders.length);
