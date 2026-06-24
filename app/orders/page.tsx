'use client';

import Link from 'next/link';
import { EmptyState } from '@/components/feedback/EmptyState';
import { OrdersLoadingState } from '@/components/feedback/OrdersLoadingState';
import { selectAllOrders } from '@/features/orders/ordersSelectors';
import { useStoreHydration } from '@/hooks/useStoreHydration';
import { formatCurrency } from '@/lib/formatCurrency';
import { useAppSelector } from '@/store/hooks';
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(iso));
}

export default function OrdersPage() {
  const isHydrated = useStoreHydration();
  const orders = useAppSelector(selectAllOrders);

  if (!isHydrated) {
    return <OrdersLoadingState />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Order history
      </Typography>
      {orders.length === 0 ? (
        <>
          <EmptyState message="No completed orders yet." />
          <Stack sx={{ mt: 3 }}>
            <Button component={Link} href="/" variant="contained">
              View catalog
            </Button>
          </Stack>
        </>
      ) : (
        <Stack component="ul" spacing={2} sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {orders.map((order) => {
            const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
            const orderLabel = `Order ${order.id.slice(0, 8)}, ${formatDate(order.createdAt)}, ${itemCount} items, total ${formatCurrency(order.total)}`;
            return (
              <Box component="li" key={order.id}>
                <Paper
                component={Link}
                href={`/orders/${order.id}`}
                variant="outlined"
                aria-label={orderLabel}
                sx={{
                  p: 2,
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  bgcolor: 'background.paper',
                  transition: 'box-shadow 0.2s',
                  '&:hover': { boxShadow: 2 },
                }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  sx={{ justifyContent: 'space-between', gap: 1 }}
                >
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Order #{order.id.slice(0, 8)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(order.createdAt)} · {itemCount} items
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {formatCurrency(order.total)}
                  </Typography>
                </Stack>
                </Paper>
              </Box>
            );
          })}
        </Stack>
      )}
    </Container>
  );
}
