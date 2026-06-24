'use client';

import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import type { IOrder } from '@/types/order';
import { getCartItemSubtotal } from '@/lib/cart';
import { formatCurrency } from '@/lib/formatCurrency';

interface OrderDetailProps {
  order: IOrder;
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(iso));
}

export function OrderDetail({ order }: OrderDetailProps) {
  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {formatDate(order.createdAt)}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Pedido #{order.id.slice(0, 8)}
      </Typography>

      <Stack spacing={2} divider={<Divider />}>
        {order.items.map((item) => (
          <Stack key={item.productId} direction="row" spacing={2}>
            <Box
              component="img"
              src={item.thumbnail}
              alt={item.title}
              sx={{
                width: 72,
                height: 72,
                objectFit: 'contain',
                bgcolor: 'grey.50',
                borderRadius: 1,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
                <Typography sx={{ fontWeight: 700 }}>
                  {formatCurrency(getCartItemSubtotal(item))}
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(item.price)} × {item.quantity}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {formatCurrency(order.total)}
        </Typography>
      </Stack>
    </Paper>
  );
}