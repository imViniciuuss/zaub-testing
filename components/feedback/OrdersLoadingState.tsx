'use client';

import { Container, Skeleton, Stack, Typography } from '@mui/material';

export function OrdersLoadingState() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Histórico de pedidos
      </Typography>
      <Stack spacing={2}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} variant="rounded" height={72} />
        ))}
      </Stack>
    </Container>
  );
}
