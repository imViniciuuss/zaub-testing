'use client';

import { useMemo, useState } from 'react';
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
import { LoadingState } from '@/components/feedback/LoadingState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { EmptyState } from '@/components/feedback/EmptyState';
import { useCart } from '@/hooks/useCart';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useGetProductsQuery } from '../productsApi';
import { ProductCard } from './ProductCard';
import type { IProduct } from '@/types/product';

const ALL_CATEGORIES = 'all';

export function ProductCatalog() {
  const { data, isLoading, isError, refetch } = useGetProductsQuery({ limit: 30 });
  const { addToCart } = useCart();
  const { showSnackbar } = useSnackbar();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(ALL_CATEGORIES);

  const handleAddToCart = (product: IProduct) => {
    addToCart(product);
    showSnackbar(`${product.title} adicionado ao carrinho`);
  };

  const products = useMemo(() => data?.products ?? [], [data]);

  const categories = useMemo(() => {
    const unique = new Set(products.map((product) => product.category));
    return Array.from(unique).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch = term === '' || product.title.toLowerCase().includes(term);
      const matchesCategory = category === ALL_CATEGORIES || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: { xs: 'stretch', md: 'flex-start' } }}
      >
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Catálogo de Produtos
          </Typography>
          <Typography color="text.secondary">
            Descubra nossa coleção selecionada de produtos de qualidade
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ minWidth: { md: 420 } }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="category-filter-label">Categoria</InputLabel>
            <Select
              labelId="category-filter-label"
              label="Categoria"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <MenuItem value={ALL_CATEGORIES}>Todas as categorias</MenuItem>
              {categories.map((item) => (
                <MenuItem key={item} value={item} sx={{ textTransform: 'capitalize' }}>
                  {item}
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
      ) : filteredProducts.length === 0 ? (
        <EmptyState message="Nenhum produto encontrado" />
      ) : (
        <>
          <Typography variant="body2" color="text.secondary">
            Mostrando {filteredProducts.length} de {products.length} produtos
          </Typography>
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Stack>
  );
}
