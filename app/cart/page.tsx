'use client';

import Link from 'next/link';
import { Box, Button, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import { CartItemRow } from '@/features/cart/components/CartItemRow';
import { EmptyState } from '@/components/feedback/EmptyState';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/formatCurrency';

export default function CartPage() {
  const { items, subtotal, incrementItem, decrementItem, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Carrinho
        </Typography>
        <EmptyState message="Seu carrinho está vazio." />
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button component={Link} href="/" variant="contained">
            Ver catálogo
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Carrinho
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Stack spacing={3} divider={<Divider />}>
          {items.map((item) => (
            <CartItemRow
              key={item.productId}
              item={item}
              onIncrement={incrementItem}
              onDecrement={decrementItem}
              onRemove={removeFromCart}
            />
          ))}
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Total do carrinho</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {formatCurrency(subtotal)}
            </Typography>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button component={Link} href="/" variant="outlined" fullWidth>
              Continuar comprando
            </Button>
            <Button component={Link} href="/checkout" variant="contained" fullWidth>
              Finalizar pedido
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
