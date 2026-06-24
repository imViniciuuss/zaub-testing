'use client';

import { Container, Skeleton, Stack, Typography } from '@mui/material';
import { pageContainerSx, pageTitleSx } from '@/lib/layout';

export function OrdersLoadingState() {
  return (
    <Container maxWidth="md" sx={pageContainerSx}>
      <Typography variant="h4" sx={pageTitleSx}>
        Order history
      </Typography>
      <Stack spacing={2}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} variant="rounded" height={72} />
        ))}
      </Stack>
    </Container>
  );
}
