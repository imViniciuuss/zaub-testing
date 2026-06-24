'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';

type Props = { children: React.ReactNode };

export default function ThemeRegistry({ children }: Props) {
  return (
    <ThemeProvider
      theme={theme}
      defaultMode="system"
      modeStorageKey="zaub-color-mode"
      disableTransitionOnChange
    >
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}