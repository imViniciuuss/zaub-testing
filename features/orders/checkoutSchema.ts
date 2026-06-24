import { z } from "zod";

export const checkoutSchema = z.object({
    name: z.string().min(2, { message: 'Enter your full name' }),
    email: z.email({ message: 'Enter a valid email' }),
    address: z.string().min(5, { message: 'Enter your address' }),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>;