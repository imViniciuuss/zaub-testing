import { ICartItem } from "./cart";

export interface IOrder {
    id: string;
    createdAt: string;
    items: ICartItem[];
    total: number;
}