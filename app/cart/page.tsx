'use client';

import Link from 'next/link';
import { Box, Button, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import { CartItemRow } from '@/features/cart/components/CartItemRow';
import { EmptyState } from '@/components/feedback/EmptyState';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/formatCurrency';
import { pageContainerSx, pageTitleSx } from '@/lib/layout';

export default function CartPage() {
  const { items, subtotal, incrementItem, decrementItem, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={pageContainerSx}>
        <Typography variant="h4" sx={pageTitleSx}>
          Cart
        </Typography>
        <EmptyState message="Your cart is empty." />
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button component={Link} href="/" variant="contained">
            View catalog
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={pageContainerSx}>
      <Typography variant="h4" sx={pageTitleSx}>
        Cart
      </Typography>

      <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 2 }, mb: 3, bgcolor: 'background.paper' }}>
        <Stack
          component="ul"
          spacing={3}
          divider={<Divider />}
          sx={{ listStyle: 'none', p: 0, m: 0 }}
        >
          {items.map((item) => (
            <Box component="li" key={item.productId}>
              <CartItemRow
                item={item}
                onIncrement={incrementItem}
                onDecrement={decrementItem}
                onRemove={removeFromCart}
              />
            </Box>
          ))}
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, bgcolor: 'background.paper' }}>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Cart total</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {formatCurrency(subtotal)}
            </Typography>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button component={Link} href="/" variant="outlined" fullWidth>
              Continue shopping
            </Button>
            <Button component={Link} href="/checkout" variant="contained" fullWidth>
              Checkout
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
