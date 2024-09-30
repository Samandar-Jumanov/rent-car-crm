import { z } from "zod"

export const loginSchema = z.object({
        phoneNumber: z.string(),
        password: z.string().min(1, 'Password is required'),
      });

export type ILoginFormData = z.infer<typeof loginSchema>;
      