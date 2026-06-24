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
          paper: '#121212',
          muted: '#1b1b1b',
        },
      },
    },
  },
  typography: {
    fontFamily: 'var(--font-inter)',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'var(--mui-palette-background-default)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
