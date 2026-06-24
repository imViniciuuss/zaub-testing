import { IProductResponse } from "@/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL = 'https://dummyjson.com';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProductResponse, { limit?: number } | void>({
            query: ({ limit = 30 } = {}) => `/products?limit=${limit}`,
        }),
    }),
})

export const { useGetProductsQuery } = productsApi;