import { describe, it, expect } from 'vitest';
import {
    cartReducer,
    addItem,
    increment,
    decrement,
    removeItem,
    clearCart,
    hydrateCart,
} from './cartSlice';
import type { ICartState } from '@/types/cart';
import type { IProduct } from '@/types/product';

const product = {
    id: 1,
    title: 'Test Product',
    price: 10,
    thumbnail: 'thumb.jpg',
    description: 'desc',
    category: 'beauty',
    rating: 4.5,
} as IProduct;


const emptyState: ICartState = { ids: [], entities: {} };

describe('cartSlice', () => {
    it('adds a new item with quantity 1 and a snapshot of the product', () => {
        const state = cartReducer(emptyState, addItem(product));
        expect(state.ids).toEqual([1]);
        expect(state.entities[1]).toEqual({
            productId: 1,
            title: 'Test Product',
            price: 10,
            thumbnail: 'thumb.jpg',
            quantity: 1,
        });
    })

    it('increments quantity when adding the same product again', () => {
        let state = cartReducer(emptyState, addItem(product));
        state = cartReducer(state, addItem(product));
        expect(state.ids).toEqual([1]);
        expect(state.entities[1].quantity).toBe(2);
    })

    it('increments quantity of an existing item', () => {
        const state = cartReducer(
            { ids: [1], entities: { 1: { productId: 1, title: 't', price: 10, thumbnail: '', quantity: 1 } } },
            increment(1),
        );
        expect(state.entities[1].quantity).toBe(2);
    });

    it('decrements quantity of an existing item', () => {
        const state = cartReducer(
            { ids: [1], entities: { 1: { productId: 1, title: 't', price: 10, thumbnail: '', quantity: 2 } } },
            decrement(1),
        );
        expect(state.ids).toEqual([1]);
        expect(state.entities[1].quantity).toBe(1);
    });

    it('removes the item when decrementing below 1', () => {
        const state = cartReducer(
            { ids: [1], entities: { 1: { productId: 1, title: 't', price: 10, thumbnail: '', quantity: 1 } } },
            decrement(1),
        );
        expect(state.ids).toEqual([]);
        expect(state.entities[1]).toBeUndefined();
    });

    it('removes an item explicitly', () => {
        const state = cartReducer(
            { ids: [1], entities: { 1: { productId: 1, title: 't', price: 10, thumbnail: '', quantity: 3 } } },
            removeItem(1),
        );
        expect(state.ids).toEqual([]);
        expect(state.entities[1]).toBeUndefined();
    });

    it('clears the whole cart', () => {
        const state = cartReducer(
            {
                ids: [1, 2], entities: {
                    1: { productId: 1, title: 'a', price: 10, thumbnail: '', quantity: 1 },
                    2: { productId: 2, title: 'b', price: 20, thumbnail: '', quantity: 2 },
                }
            },
            clearCart(),
        );
        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
    });

    it('replaces state on hydrateCart', () => {
        const persisted: ICartState = {
            ids: [9],
            entities: { 9: { productId: 9, title: 'x', price: 5, thumbnail: '', quantity: 4 } },
        };
        const state = cartReducer(emptyState, hydrateCart(persisted));
        expect(state).toEqual(persisted);
    });
})