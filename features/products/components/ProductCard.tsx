'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import type { IProduct } from '@/types/product';
import { formatCurrency } from '@/lib/formatCurrency';

interface ProductCardProps {
  product: IProduct;
  onAddToCart?: (product: IProduct) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        bgcolor: 'background.paper',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        '&:hover': {
          boxShadow: 3,
          borderColor: 'primary.main',
        },
      }}
    >
      <Box sx={{ bgcolor: 'background.muted', p: { xs: 1.5, sm: 2 } }}>
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
          sx={{ height: { xs: 140, sm: 160 }, objectFit: 'contain' }}
        />
      </Box>

      <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 1, p: { xs: 1.5, sm: 2 } }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: 'space-between', alignItems: 'flex-start', minWidth: 0 }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              lineHeight: 1.3,
              flex: 1,
              minWidth: 0,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.title}
          </Typography>
          <Chip
            label={product.category}
            size="small"
            sx={{ textTransform: 'capitalize', flexShrink: 0, maxWidth: '40%' }}
          />
        </Stack>

        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <Rating
            value={product.rating}
            precision={0.1}
            size="small"
            readOnly
            getLabelText={(value) => `${value} out of 5 stars`}
          />
          <Typography variant="body2" color="text.secondary">
            ({product.rating.toFixed(2)})
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.description}
        </Typography>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={1}
          sx={{ mt: 'auto', pt: 1, justifyContent: 'space-between', alignItems: { xs: 'stretch', md: 'center' } }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {formatCurrency(product.price)}
          </Typography>
          <Button
            variant="contained"
            size="small"
            startIcon={<ShoppingCartOutlinedIcon sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />}
            onClick={() => onAddToCart?.(product)}
            aria-label={`Add ${product.title} to cart`}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Add to cart
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
