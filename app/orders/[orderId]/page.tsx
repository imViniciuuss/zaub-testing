'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button, Container, Skeleton, Stack, Typography } from '@mui/material';
import { EmptyState } from '@/components/feedback/EmptyState';
import { OrderDetail } from '@/features/orders/components/OrderDetail';
import { selectOrderById } from '@/features/orders/ordersSelectors';
import { useStoreHydration } from '@/hooks/useStoreHydration';
import { useAppSelector } from '@/store/hooks';

export default function OrderDetailPage() {
  const params = useParams<{ orderId: string }>();
  const isHydrated = useStoreHydration();
  const order = useAppSelector(selectOrderById(params.orderId));

  if (!isHydrated) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Skeleton variant="text" width={240} height={40} />
        <Skeleton variant="rounded" height={300} sx={{ mt: 2 }} />
      </Container>
    );
  }

  if (!order) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <EmptyState message="Pedido não encontrado." />
        <Stack sx={{ mt: 3 }}>
          <Button component={Link} href="/orders" variant="contained">
            Voltar ao histórico
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Detalhe do pedido
      </Typography>
      <OrderDetail order={order} />
      <Button component={Link} href="/orders" sx={{ mt: 2 }}>
        Voltar ao histórico
      </Button>
    </Container>
  );
}