import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ICartItem, ICartState } from '@/types/cart';
import type { IProduct } from '@/types/product';

const initialState: ICartState = {
  ids: [],
  entities: {},
};

function toCartItem(product: IProduct): ICartItem {
  return {
    productId: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    quantity: 1,
  };
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<IProduct>) {
      const productId = action.payload.id;
      const existing = state.entities[productId];

      if (existing) {
        existing.quantity += 1;
        return;
      }

      state.ids.push(productId);
      state.entities[productId] = toCartItem(action.payload);
    },
    increment(state, action: PayloadAction<number>) {
      const item = state.entities[action.payload];
      if (item) item.quantity += 1;
    },
    decrement(state, action: PayloadAction<number>) {
      const item = state.entities[action.payload];
      if (!item) return;

      if (item.quantity <= 1) {
        state.ids = state.ids.filter((id) => id !== action.payload);
        delete state.entities[action.payload];
        return;
      }

      item.quantity -= 1;
    },
    removeItem(state, action: PayloadAction<number>) {
      state.ids = state.ids.filter((id) => id !== action.payload);
      delete state.entities[action.payload];
    },
    clearCart(state) {
      state.ids = [];
      state.entities = {};
    },
  },
});

export const { addItem, increment, decrement, removeItem, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
