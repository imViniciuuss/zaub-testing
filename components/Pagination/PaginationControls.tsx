'use client';

import { Box, Pagination, useMediaQuery, useTheme } from '@mui/material';

interface PaginationControlsProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}

export function PaginationControls({ page, pageCount, onChange }: PaginationControlsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (pageCount <= 1) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, overflow: 'hidden' }}>
      <Pagination
        page={page}
        count={pageCount}
        onChange={(_event, value) => onChange(value)}
        color="primary"
        shape="rounded"
        size={isMobile ? 'small' : 'medium'}
        siblingCount={isMobile ? 0 : 1}
        boundaryCount={1}
        getItemAriaLabel={(type, pageNumber) => {
          if (type === 'page') return `Go to page ${pageNumber}`;
          if (type === 'first') return 'Go to first page';
          if (type === 'last') return 'Go to last page';
          if (type === 'next') return 'Go to next page';
          return 'Go to previous page';
        }}
      />
    </Box>
  );
}
