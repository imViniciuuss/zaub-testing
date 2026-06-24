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
  return new Intl.DateTimeFormat('pt-BR', {
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
        Histórico de pedidos
      </Typography>
      {orders.length === 0 ? (
        <>
          <EmptyState message="Nenhum pedido finalizado ainda." />
          <Stack sx={{ mt: 3 }}>
            <Button component={Link} href="/" variant="contained">
              Ver catálogo
            </Button>
          </Stack>
        </>
      ) : (
        <Stack spacing={2}>
          {orders.map((order) => {
            const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
            return (
              <Paper
                key={order.id}
                component={Link}
                href={`/orders/${order.id}`}
                variant="outlined"
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
                      Pedido #{order.id.slice(0, 8)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(order.createdAt)} · {itemCount} itens
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {formatCurrency(order.total)}
                  </Typography>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      )}
    </Container>
  );
}
