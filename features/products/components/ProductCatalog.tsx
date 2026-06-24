'use client';

import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PaginationControls } from '@/components/Pagination/PaginationControls';
import { LoadingState } from '@/components/feedback/LoadingState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { EmptyState } from '@/components/feedback/EmptyState';
import { useCart } from '@/hooks/useCart';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useProductCatalog } from '../hooks/useProductCatalog';
import { ProductCard } from './ProductCard';
import type { IProduct } from '@/types/product';

export function ProductCatalog() {
  const {
    page,
    setPage,
    pageCount,
    search,
    setSearch,
    category,
    setCategory,
    categories,
    products,
    total,
    rangeStart,
    rangeEnd,
    isLoading,
    isError,
    refetch,
    ALL_CATEGORIES,
  } = useProductCatalog();

  const { addToCart } = useCart();
  const { showSnackbar } = useSnackbar();

  const handleAddToCart = (product: IProduct) => {
    addToCart(product);
    showSnackbar(`${product.title} added to cart`);
  };

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: { xs: 'stretch', md: 'flex-start' } }}
      >
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Product Catalog
          </Typography>
          <Typography color="text.secondary">
            Discover our curated collection of quality products
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ minWidth: { md: 420 } }}>
          <TextField
            fullWidth
            size="small"
            id="product-search"
            label="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" aria-hidden />
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="category-filter-label">Category</InputLabel>
            <Select
              labelId="category-filter-label"
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value={ALL_CATEGORIES}>All categories</MenuItem>
              {categories.map((item) => (
                <MenuItem key={item.slug} value={item.slug} sx={{ textTransform: 'capitalize' }}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : products.length === 0 ? (
        <EmptyState message="No products found" />
      ) : (
        <>
          <Typography
            variant="body2"
            color="text.secondary"
            aria-live="polite"
            aria-atomic="true"
          >
            Showing {rangeStart}–{rangeEnd} of {total} products
          </Typography>
          <Grid container spacing={2} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
            {products.map((product) => (
              <Grid key={product.id} component="li" size={{ xs: 12, sm: 6, md: 4 }}>
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </Grid>
            ))}
          </Grid>
          <PaginationControls page={page} pageCount={pageCount} onChange={setPage} />
        </>
      )}
    </Stack>
  );
}