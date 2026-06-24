'use client';

import { useEffect, useState } from 'react';
import { CATALOG_PAGE_SIZE, getPageCount, getSkip } from '@/lib/catalog';
import {
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
    useGetProductsQuery,
    useSearchProductsQuery,
} from '../productsApi';

const ALL_CATEGORIES = 'all';


export function useProductCatalog() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState(ALL_CATEGORIES);
    const searchTerm = search.trim();
    const skip = getSkip(page);
    const queryParams = { limit: CATALOG_PAGE_SIZE, skip };

    useEffect(() => {
        setPage(1);
    }, [searchTerm, category]);

    const productsQuery = useGetProductsQuery(queryParams, {
        skip: !!searchTerm || category !== ALL_CATEGORIES,
    });
    const searchQuery = useSearchProductsQuery(
        { q: searchTerm, ...queryParams },
        { skip: !searchTerm },
    );
    const categoryQuery = useGetProductsByCategoryQuery(
        { category, ...queryParams },
        { skip: !!searchTerm || category === ALL_CATEGORIES },
    );
    const categoriesQuery = useGetCategoriesQuery();
    const activeQuery = searchTerm
        ? searchQuery
        : category !== ALL_CATEGORIES
            ? categoryQuery
            : productsQuery;
            
    const products = activeQuery.data?.products ?? [];
    const total = activeQuery.data?.total ?? 0;
    const pageCount = getPageCount(total);
    const rangeStart = total === 0 ? 0 : skip + 1;
    const rangeEnd = Math.min(skip + products.length, total);

    return {
        page,
        setPage,
        pageCount,
        search,
        setSearch,
        category,
        setCategory,
        categories: categoriesQuery.data ?? [],
        products,
        total,
        rangeStart,
        rangeEnd,
        isLoading: activeQuery.isLoading || categoriesQuery.isLoading,
        isError: activeQuery.isError,
        refetch: activeQuery.refetch,
        ALL_CATEGORIES,
    };

}