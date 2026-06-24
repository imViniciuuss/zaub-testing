'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#1976d2' },
        background: {
          muted: '#f5f5f5',
        },
      },
    },
    dark: {
      palette: {
        primary: { main: '#90caf9' },
        background: {
          default: '#121212',
          paper: '#2a2a2a',
          muted: '#383838',
        },
      },
    },
  },
  typography: {
    fontFamily: 'var(--font-inter)',
  },
});

export default theme;
