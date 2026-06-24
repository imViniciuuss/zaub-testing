'use client';

import {
  Box,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import type { ICartItem } from '@/types/cart';
import { formatCurrency } from '@/lib/formatCurrency';
import { getCartItemSubtotal } from '@/lib/cart';
import { itemSurfaceBg } from '@/lib/surfaces';

interface CartItemRowProps {
  item: ICartItem;
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
  onRemove: (productId: number) => void;
  compact?: boolean;
}

export function CartItemRow({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  compact = false,
}: CartItemRowProps) {
  const lineSubtotal = getCartItemSubtotal(item);

  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
      <Box
        sx={{
          width: compact ? 72 : 96,
          height: compact ? 72 : 96,
          flexShrink: 0,
          borderRadius: 1,
          bgcolor: itemSurfaceBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 0.5,
        }}
      >
        <Box
          component="img"
          src={item.thumbnail}
          alt={item.title}
          sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}
        >
          <Typography variant={compact ? 'subtitle2' : 'subtitle1'} sx={{ fontWeight: 600 }}>
            {item.title}
          </Typography>
          <Typography variant={compact ? 'subtitle2' : 'subtitle1'} sx={{ fontWeight: 700, flexShrink: 0 }}>
            {formatCurrency(lineSubtotal)}
          </Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {formatCurrency(item.price)} × {item.quantity}
        </Typography>

        <Stack direction="row" sx={{ alignItems: 'center', mt: 1 }} role="group" aria-label={`Quantity for ${item.title}`}>
          <IconButton
            size="small"
            onClick={() => onDecrement(item.productId)}
            aria-label={`Decrease quantity of ${item.title}`}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography
            variant="body2"
            aria-live="polite"
            aria-atomic="true"
            sx={{ minWidth: 24, textAlign: 'center' }}
          >
            {item.quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={() => onIncrement(item.productId)}
            aria-label={`Increase quantity of ${item.title}`}
          >
            <AddIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => onRemove(item.productId)}
            sx={{ ml: 'auto' }}
            aria-label={`Remove ${item.title} from cart`}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  );
}
