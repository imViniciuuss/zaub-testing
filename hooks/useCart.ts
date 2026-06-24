'use client';

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addItem,
  clearCart,
  decrement,
  increment,
  removeItem,
} from '@/features/cart/cartSlice';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartTotalItems,
} from '@/features/cart/cartSelectors';
import type { IProduct } from '@/types/product';

export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartTotalItems);
  const subtotal = useAppSelector(selectCartSubtotal);

  const addToCart = useCallback(
    (product: IProduct) => {
      dispatch(addItem(product));
    },
    [dispatch],
  );

  const incrementItem = useCallback(
    (productId: number) => {
      dispatch(increment(productId));
    },
    [dispatch],
  );

  const decrementItem = useCallback(
    (productId: number) => {
      dispatch(decrement(productId));
    },
    [dispatch],
  );

  const removeFromCart = useCallback(
    (productId: number) => {
      dispatch(removeItem(productId));
    },
    [dispatch],
  );

  const emptyCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return {
    items,
    totalItems,
    subtotal,
    addToCart,
    incrementItem,
    decrementItem,
    removeFromCart,
    emptyCart,
  };
}
