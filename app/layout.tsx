
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Metadata } from "next";
import "./globals.css";

import { Inter } from 'next/font/google';
import { InitColorSchemeScript } from '@mui/material';
import Header from '@/components/header/Header';
import { MainContent } from '@/components/MainContent';
import { SkipLink } from '@/components/SkipLink';
import ReduxProvider from '@/providers/ReduxProvider';
import { SnackbarProvider } from '@/providers/SnackbarProvider';
import ThemeRegistry from '@/providers/ThemeRegistry';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});


export const metadata: Metadata = {
  title: 'Zaub Store',
  description: 'E-commerce catalog, cart, checkout and order history',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-full">
        <InitColorSchemeScript
          attribute="class"
          defaultMode="system"
          modeStorageKey="zaub-color-mode"
        />
        <AppRouterCacheProvider>
          <ReduxProvider>
            <ThemeRegistry>
              <SnackbarProvider>
                <SkipLink />
                <Header />
                <MainContent>{children}</MainContent>
              </SnackbarProvider>
            </ThemeRegistry>
          </ReduxProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
