'use client';

import { useCart } from "@/hooks/useCart";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CheckoutFormData, checkoutSchema } from "../checkoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { placeOrder } from "../ordersSlice";
import { clearCart } from "@/features/cart/cartSlice";
import { Button, Stack, TextField } from "@mui/material";

export function CheckoutForm() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { items, subtotal } = useCart();
    const { showSnackbar } = useSnackbar();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: { name: '', email: '', address: '' },
    });

    const onSubmit = (data: CheckoutFormData) => {
        if (items.length === 0) {
            showSnackbar('Seu carrinho está vazio', 'error');
            return;
        }
        dispatch(placeOrder({ items, total: subtotal }));
        dispatch(clearCart());
        showSnackbar('Pedido finalizado com sucesso!');
        router.push('/orders');
    };

    return (
        <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Nome"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
            />
            <TextField
                label="E-mail"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
            />
            <TextField
                label="Endereço"
                {...register('address')}
                error={!!errors.address}
                helperText={errors.address?.message}
                fullWidth
                multiline
                minRows={2}
            />
            <Button type="submit" variant="contained" disabled={isSubmitting}>
                Confirmar pedido
            </Button>
        </Stack>
    );

}