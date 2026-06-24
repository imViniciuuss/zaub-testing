'use client';

import { Grid, Skeleton } from '@mui/material';
export function LoadingState({ count = 6 }: { count?: number }) {
    return (
        <Grid container spacing={2} aria-busy="true" aria-label="Loading products">
            {Array.from({ length: count }).map((_, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Skeleton variant="rectangular" height={200} />
                    <Skeleton />
                    <Skeleton width="60%" />
                </Grid>
            ))}
        </Grid>
    );
}