'use client';

import { Alert, Button, Stack, StackProps } from '@mui/material';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Não foi possível carregar os dados.',
  onRetry,
  ...stackProps
}: ErrorStateProps & StackProps) {
  return (
    <Stack spacing={2} {...stackProps}>
      <Alert severity="error">{message}</Alert>
      {onRetry && (
        <Button variant="outlined" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </Stack>
  );
}