'use client';

import { Box } from '@mui/material';

export function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <Box component="main" id="main-content" tabIndex={-1} sx={{ outline: 'none' }}>
      {children}
    </Box>
  );
}
