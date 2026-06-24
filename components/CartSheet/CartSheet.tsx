'use client';

import Link from 'next/link';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CartItemRow } from '@/features/cart/components/CartItemRow';
import { EmptyState } from '@/components/feedback/EmptyState';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/formatCurrency';

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSheet({ isOpen, onClose }: CartSheetProps) {
  const { items, subtotal, incrementItem, decrementItem, removeFromCart } = useCart();

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      aria-labelledby="cart-drawer-title"
      slotProps={{
        paper: {
          sx: { bgcolor: 'background.paper' },
        },
      }}
    >
      <Box
        sx={{
          width: { xs: 'min(100%, 400px)', sm: 400 },
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          bgcolor: 'background.paper',
        }}
      >
        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between', px: 2, py: 2 }}
        >
          <Typography id="cart-drawer-title" variant="h6" component="h2" sx={{ fontWeight: 700 }}>
            Cart
          </Typography>
          <IconButton onClick={onClose} aria-label="Close cart">
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider />

        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {items.length === 0 ? (
            <EmptyState message="Your cart is empty." />
          ) : (
            <Stack
              component="ul"
              spacing={2}
              divider={<Divider flexItem />}
              sx={{ listStyle: 'none', p: 0, m: 0 }}
            >
              {items.map((item) => (
                <Box component="li" key={item.productId}>
                  <CartItemRow
                    item={item}
                    compact
                    onIncrement={incrementItem}
                    onDecrement={decrementItem}
                    onRemove={removeFromCart}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Box>

        {items.length > 0 && (
          <>
            <Divider />
            <Stack spacing={2} sx={{ p: 2 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">Cart total</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {formatCurrency(subtotal)}
                </Typography>
              </Stack>
              <Button component={Link} href="/cart" variant="outlined" fullWidth onClick={onClose}>
                View cart
              </Button>
              <Button component={Link} href="/checkout" variant="contained" fullWidth onClick={onClose}>
                Checkout
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Drawer>
  );
}
