'use client'

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import { formatCurrency } from "@/lib/formatCurrency";
import { pageContainerSx, pageTitleSx, paperPaddingSx, truncateSx } from '@/lib/layout';
import Link from "next/link";
import { CheckoutForm } from "@/features/orders/components/CheckoutForm";


export default function CheckoutPage() {
    const router = useRouter();
    const { items, subtotal } = useCart();

    useEffect(() => {
        if (items.length === 0) router.replace('/cart');
    }, []);

    if (items.length === 0) return null;

    return (
        <Container maxWidth="md" sx={pageContainerSx}>
            <Typography variant="h4" sx={pageTitleSx}>
                Checkout
            </Typography>
            <Paper variant="outlined" sx={{ ...paperPaddingSx, mb: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h6" gutterBottom>
                    Summary
                </Typography>
                <Stack spacing={1}>
                    {items.map((item) => (
                        <Stack
                            key={item.productId}
                            direction="row"
                            sx={{ justifyContent: 'space-between', gap: 1 }}
                        >
                            <Typography variant="body2" sx={{ ...truncateSx, flex: 1 }}>
                                {item.title} × {item.quantity}
                            </Typography>
                            <Typography variant="body2" sx={{ flexShrink: 0 }}>
                                {formatCurrency(item.price * item.quantity)}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        Total
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {formatCurrency(subtotal)}
                    </Typography>
                </Stack>
            </Paper>
            <Paper variant="outlined" sx={{ ...paperPaddingSx, bgcolor: 'background.paper' }}>
                <CheckoutForm />
            </Paper>
            <Button component={Link} href="/cart" sx={{ mt: 2 }}>
                Back to cart
            </Button>
        </Container>
    );
}