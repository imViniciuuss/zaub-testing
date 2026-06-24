'use client';

import { Box } from '@mui/material';

export function SkipLink() {
  return (
    <Box
      component="a"
      href="#main-content"
      sx={{
        position: 'absolute',
        left: -9999,
        zIndex: (theme) => theme.zIndex.tooltip + 1,
        px: 2,
        py: 1,
        bgcolor: 'background.paper',
        color: 'text.primary',
        textDecoration: 'none',
        borderRadius: 1,
        boxShadow: 2,
        '&:focus': {
          left: 16,
          top: 16,
        },
      }}
    >
      Skip to main content
    </Box>
  );
}
