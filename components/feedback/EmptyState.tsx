'use client';

import { Typography } from '@mui/material';

export function EmptyState({ message = 'Nenhum item encontrado.' }) {
  return (
    <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
      {message}
    </Typography>
  );
}