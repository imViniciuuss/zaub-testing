import { STORAGE_KEYS } from "@/lib/constants";
import { loadFromStorage, saveToStorage } from "@/lib/storage";
import { ICartState } from "@/types/cart";
import { IOrder } from "@/types/order";
import { EntityState } from "@reduxjs/toolkit";


export function loadPersistedState() {
    return {
      cart: loadFromStorage<ICartState>(STORAGE_KEYS.cart),
      orders: loadFromStorage<EntityState<IOrder, string>>(STORAGE_KEYS.orders),
    };
  }

export function saveCartState(cart: ICartState): void {
    saveToStorage(STORAGE_KEYS.cart, cart);
}

export function saveOrdersState(orders: EntityState<IOrder, string>): void {
    saveToStorage(STORAGE_KEYS.orders, orders);
  }