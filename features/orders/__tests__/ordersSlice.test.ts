import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ordersReducer, placeOrder, hydrateOrders, ordersAdapter } from '../ordersSlice';
import type { ICartItem } from '@/types/cart';
import type { EntityState } from '@reduxjs/toolkit';
import type { IOrder } from '@/types/order';

const items: ICartItem[] = [
    { productId: 1, title: 'Product A', price: 10, thumbnail: 'a.jpg', quantity: 2 },
];

const emptyState = ordersAdapter.getInitialState();

describe('ordersSlice', () => {
    beforeEach(() => {
        vi.spyOn(crypto, 'randomUUID').mockReturnValue('order-uuid-1');
        vi.spyOn(Date.prototype, 'toISOString').mockReturnValue('2026-06-24T12:00:00.000Z');
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('creates an order with id, createdAt, items snapshot and total', () => {
        const state = ordersReducer(
            emptyState,
            placeOrder({ items, total: 20 }),
        );
        const order = state.entities['order-uuid-1'];
        expect(order).toEqual({
            id: 'order-uuid-1',
            createdAt: '2026-06-24T12:00:00.000Z',
            items,
            total: 20,
        });
        expect(state.ids).toContain('order-uuid-1');
    });

    it('snapshots items (mutating source does not change stored order)', () => {
        const mutableItems = items.map((item) => ({ ...item }));
        const state = ordersReducer(
            emptyState,
            placeOrder({ items: mutableItems, total: 20 }),
        );
        mutableItems[0].quantity = 99;
        const order = state.entities['order-uuid-1'];
        expect(order?.items[0].quantity).toBe(2);
    });

    it('sorts orders by createdAt descending', () => {
        vi.spyOn(Date.prototype, 'toISOString')
            .mockReturnValueOnce('2026-06-24T10:00:00.000Z')
            .mockReturnValueOnce('2026-06-24T12:00:00.000Z');
        vi.spyOn(crypto, 'randomUUID')
            .mockReturnValueOnce('order-1')
            .mockReturnValueOnce('order-2');
        let state = ordersReducer(emptyState, placeOrder({ items, total: 20 }));
        state = ordersReducer(state, placeOrder({ items, total: 20 }));
        expect(state.ids[0]).toBe('order-2');
        expect(state.ids[1]).toBe('order-1');
    });

    it('replaces state on hydrateOrders', () => {
        const persisted: EntityState<IOrder, string> = {
            ids: ['saved-order'],
            entities: {
                'saved-order': {
                    id: 'saved-order',
                    createdAt: '2026-06-24T12:00:00.000Z',
                    items,
                    total: 20,
                },
            },
        };
        const state = ordersReducer(emptyState, hydrateOrders(persisted));
        expect(state).toEqual(persisted);
    });
})
