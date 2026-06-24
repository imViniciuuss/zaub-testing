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
    <Stack direction="row" sx={{ spacing: 1.5, alignItems: 'flex-start' }}>
      <Box
        component="img"
        src={item.thumbnail}
        alt={item.title}
        sx={{
          width: compact ? 72 : 96,
          height: compact ? 72 : 96,
          objectFit: 'contain',
          bgcolor: 'grey.50',
          borderRadius: 1,
          flexShrink: 0,
        }}
      />
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

        <Stack direction="row" sx={{ alignItems: 'center', mt: 1 }}>
          <IconButton size="small" onClick={() => onDecrement(item.productId)} aria-label="Diminuir quantidade">
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" sx={{ minWidth: 24, textAlign: 'center' }}>
            {item.quantity}
          </Typography>
          <IconButton size="small" onClick={() => onIncrement(item.productId)} aria-label="Aumentar quantidade">
            <AddIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => onRemove(item.productId)}
            sx={{ ml: 'auto' }}
            aria-label="Remover item"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  );
}
