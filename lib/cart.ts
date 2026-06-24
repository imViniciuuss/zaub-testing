import type { ICartItem } from '@/types/cart';

export function getCartItemSubtotal(item: ICartItem): number {
  return item.price * item.quantity;
}
