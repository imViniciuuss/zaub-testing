import { ICartItem } from "@/types/cart";
import { IOrder } from "@/types/order";
import { createEntityAdapter, createSlice, type EntityState, type PayloadAction } from "@reduxjs/toolkit";


export const ordersAdapter = createEntityAdapter<IOrder>({
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = ordersAdapter.getInitialState();

interface PlaceOrderPayload {
    items: ICartItem[];
    total: number;
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        placeOrder: {
            reducer: ordersAdapter.addOne,
            prepare({ items, total }: PlaceOrderPayload) {
                return {
                    payload: {
                        id: crypto.randomUUID(),
                        createdAt: new Date().toISOString(),
                        items: items.map((item) => ({ ...item })), // snapshot
                        total,
                    },
                };
            }
        },
        hydrateOrders(_state, action: PayloadAction<EntityState<IOrder, string>>) {
            return action.payload;
        },
    }
})

export const { placeOrder, hydrateOrders } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;