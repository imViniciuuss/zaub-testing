'use client'

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import { formatCurrency } from "@/lib/formatCurrency";
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
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                Finalizar pedido
            </Typography>
            <Paper variant="outlined" sx={{ p: 3, mb: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h6" gutterBottom>
                    Resumo
                </Typography>
                <Stack spacing={1}>
                    {items.map((item) => (
                        <Stack
                            key={item.productId}
                            direction="row"
                            sx={{ justifyContent: 'space-between' }}
                        >
                            <Typography variant="body2">
                                {item.title} × {item.quantity}
                            </Typography>
                            <Typography variant="body2">
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
            <Paper variant="outlined" sx={{ p: 3, bgcolor: 'background.paper' }}>
                <CheckoutForm />
            </Paper>
            <Button component={Link} href="/cart" sx={{ mt: 2 }}>
                Voltar ao carrinho
            </Button>
        </Container>
    );
}