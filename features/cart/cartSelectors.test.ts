import { describe, it, expect } from 'vitest';
import {
    selectCartItems,
    selectCartTotalItems,
    selectCartTotal,
    selectCartSubtotal,
    selectCartItemsWithSubtotals,
    selectCartItemSubtotal,
} from './cartSelectors';
import { makeStore, type RootState } from '@/store';


const mockState: RootState = {
    ...makeStore().getState(),
    cart: {
        ids: [1, 2],
        entities: {
            1: { productId: 1, title: 'A', price: 10, thumbnail: '', quantity: 2 },
            2: { productId: 2, title: 'B', price: 5, thumbnail: '', quantity: 1 },
        },
    },
};


describe('cartSelectors', () => {
    it('selectCartItems returns items in ids order', () => {
        const items = selectCartItems(mockState);
        expect(items).toHaveLength(2);
        expect(items[0].productId).toBe(1);
        expect(items[1].productId).toBe(2);
    });

    it('selectCartTotalItems sums quantities', () => {
        expect(selectCartTotalItems(mockState)).toBe(3);
    });

    it('selectCartTotal sums line subtotals', () => {
        expect(selectCartTotal(mockState)).toBe(25);
    });

    it('selectCartSubtotal is an alias of selectCartTotal', () => {
        expect(selectCartSubtotal(mockState)).toBe(selectCartTotal(mockState));
    });

    it('selectCartItemsWithSubtotals adds lineSubtotal', () => {
        const items = selectCartItemsWithSubtotals(mockState);
        expect(items[0].lineSubtotal).toBe(20);
        expect(items[1].lineSubtotal).toBe(5);
    });
    it('selectCartItemSubtotal returns subtotal for one product', () => {
        expect(selectCartItemSubtotal(1)(mockState)).toBe(20);
        expect(selectCartItemSubtotal(999)(mockState)).toBe(0);
    });
})