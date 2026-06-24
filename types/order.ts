import { ICartItem } from "./cart";

export interface IOrderItem {
    id: string;
    createdAt: string;
    items: ICartItem[];
    total: number;
}