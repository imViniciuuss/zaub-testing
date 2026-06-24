export interface ICartItem {
    productId: number;
    title: string;
    price: number;
    thumbnail: string;
    quantity: number;
}

export interface ICartState {
    ids: number[];
    entities: Record<number, ICartItem>;
}