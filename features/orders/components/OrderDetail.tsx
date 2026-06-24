'use client';

import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import type { IOrder } from '@/types/order';
import { getCartItemSubtotal } from '@/lib/cart';
import { formatCurrency } from '@/lib/formatCurrency';
import { paperPaddingSx, truncateSx } from '@/lib/layout';
import { itemSurfaceBg } from '@/lib/surfaces';

interface OrderDetailProps {
  order: IOrder;
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(iso));
}

export function OrderDetail({ order }: OrderDetailProps) {
  return (
    <Paper variant="outlined" sx={{ ...paperPaddingSx, bgcolor: 'background.paper' }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {formatDate(order.createdAt)}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Order #{order.id.slice(0, 8)}
      </Typography>

      <Stack spacing={2} divider={<Divider />}>
        {order.items.map((item) => (
          <Stack key={item.productId} direction="row" spacing={2}>
            <Box
              sx={{
                width: { xs: 64, sm: 72 },
                height: { xs: 64, sm: 72 },
                flexShrink: 0,
                borderRadius: 1,
                bgcolor: itemSurfaceBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 0.5,
              }}
            >
              <Box
                component="img"
                src={item.thumbnail}
                alt={item.title}
                sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ justifyContent: 'space-between', gap: 0.5 }}
              >
                <Typography sx={{ fontWeight: 600, ...truncateSx }}>
                  {item.title}
                </Typography>
                <Typography sx={{ fontWeight: 700, flexShrink: 0 }}>
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
