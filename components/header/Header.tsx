'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from '@/hooks/useCart';
import CartSheet from '@/components/CartSheet/CartSheet';
import ThemeToggle from '@/components/header/ThemeToggle';

export default function Header() {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartAriaLabel =
    totalItems > 0 ? `Cart, ${totalItems} items` : 'Cart, empty';

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box
          component="nav"
          aria-label="Main navigation"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: (theme) => theme.breakpoints.values.xl,
            mx: 'auto',
            px: { xs: 2, md: 3 },
            py: { xs: 1.5, md: 2 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, minWidth: 0 }}>
            <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
              <Typography
                sx={{
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  fontWeight: 700,
                  color: 'text.primary',
                }}
              >
                Zaub Store
              </Typography>
            </Link>
            <Button
              component={Link}
              href="/orders"
              size="small"
              sx={{ textTransform: 'none', fontWeight: 500, flexShrink: 0 }}
            >
              Orders
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
            <ThemeToggle />
            <Button
              variant="outlined"
              size="small"
              onClick={() => setIsCartOpen(true)}
              aria-label={cartAriaLabel}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                gap: 1,
                borderRadius: 1,
                px: { xs: 1, sm: 1.5 },
                py: 1,
                minWidth: { xs: 40, sm: 'auto' },
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 18 }} aria-hidden />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Cart
              </Box>
              {totalItems > 0 && (
                <Box
                  component="span"
                  aria-hidden
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 20,
                    height: 20,
                    px: 0.75,
                    borderRadius: 999,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {totalItems}
                </Box>
              )}
            </Button>
          </Box>
        </Box>
      </Box>
      <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
