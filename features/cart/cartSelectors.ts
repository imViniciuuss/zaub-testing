import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { getCartItemSubtotal } from '@/lib/cart';

const selectCartState = (state: RootState) => state.cart;

export const selectCartIds = createSelector(selectCartState, (cart) => cart.ids);

export const selectCartItems = createSelector(selectCartState, (cart) =>
  cart.ids.map((id) => cart.entities[id]).filter(Boolean),
);

export const selectCartItemsWithSubtotals = createSelector(selectCartItems, (items) =>
  items.map((item) => ({
    ...item,
    lineSubtotal: getCartItemSubtotal(item),
  })),
);

export const selectCartItemSubtotal = (productId: number) =>
  createSelector(selectCartItems, (items) => {
    const item = items.find((cartItem) => cartItem.productId === productId);
    return item ? getCartItemSubtotal(item) : 0;
  });

export const selectCartTotalItems = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
);

export const selectCartTotal = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + getCartItemSubtotal(item), 0),
);

// alias para compatibilidade
export const selectCartSubtotal = selectCartTotal;
