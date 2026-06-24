'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from '@/hooks/useCart';
import CartSheet from '@/components/CartSheet/CartSheet';

export default function Header() {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

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
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: (theme) => theme.breakpoints.values.xl,
            mx: 'auto',
            px: 3,
            py: 2,
          }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Typography sx={{ fontSize: '1.125rem', fontWeight: 700, color: 'text.primary' }}>
              Zaub Store
            </Typography>
          </Link>
          <Button
            variant="outlined"
            onClick={() => setIsCartOpen(true)}
            sx={{ textTransform: 'none', fontWeight: 500, gap: 1, borderRadius: 1, px: 1.5, py: 1 }}
          >
            <ShoppingCartOutlinedIcon sx={{ fontSize: 18 }} />
            Carrinho
            {totalItems > 0 && (
              <Box
                component="span"
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
      <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
