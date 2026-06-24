export const pageContainerSx = { py: { xs: 2, md: 4 } } as const;

export const pageTitleSx = {
  fontWeight: 700,
  mb: { xs: 2, md: 3 },
  fontSize: { xs: '1.5rem', md: '2.125rem' },
} as const;

export const paperPaddingSx = { p: { xs: 2, md: 3 } } as const;

export const truncateSx = {
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
} as const;
