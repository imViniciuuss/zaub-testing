'use client';

import { Typography } from '@mui/material';

export function EmptyState({ message = 'No items found.' }) {
  return (
    <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
      {message}
    </Typography>
  );
}