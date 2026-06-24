import { z } from "zod";

export const checkoutSchema = z.object({
    name: z.string().min(2, { message: 'Informe seu nome completo' }),
    email: z.email({ message: 'Informe um email válido' }),
    address: z.string().min(5, { message: 'Informe seu endereço' }),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>;