import { describe, it, expect } from 'vitest';
import { getCartItemSubtotal } from './cart';
import type { ICartItem } from '@/types/cart';

const item: ICartItem = {
    productId: 1,
    title: 'Test',
    price: 12.5,
    thumbnail: '',
    quantity: 3,
};

describe('getCartItemSubtotal', () => {
    it('returns price multiplied by quantity', () => {
        expect(getCartItemSubtotal(item)).toBe(37.5);
    });

    it('returns 0 when quantity is 0', () => {
        expect(getCartItemSubtotal({ ...item, quantity: 0 })).toBe(0);
    });
});