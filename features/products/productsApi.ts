import { ICategoriesResponse, IProductResponse } from "@/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL = 'https://dummyjson.com';

export interface ProductsQueryParams {
    limit: number;
    skip: number;
}

export interface SearchProductsParams extends ProductsQueryParams {
    q: string;
}
export interface CategoryProductsParams extends ProductsQueryParams {
    category: string;
}

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProductResponse, ProductsQueryParams>({
            query: ({ limit, skip }) => `/products?limit=${limit}&skip=${skip}`,
        }),
        searchProducts: builder.query<IProductResponse, SearchProductsParams>({
            query: ({ q, limit, skip }) =>
                `/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`,
        }),
        getProductsByCategory: builder.query<IProductResponse, CategoryProductsParams>({
            query: ({ category, limit, skip }) =>
                `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`,
        }),
        getCategories: builder.query<ICategoriesResponse, void>({
            query: () => '/products/categories',
        }),
    }),
})

export const { 
    useGetProductsQuery, 
    useSearchProductsQuery, 
    useGetProductsByCategoryQuery, 
    useGetCategoriesQuery 
} = productsApi;