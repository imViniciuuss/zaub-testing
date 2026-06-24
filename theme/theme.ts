'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    cssVariables: true,
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
    },
    typography: {
        fontFamily: 'var(--font-inter)',
    },
});

export default theme;
