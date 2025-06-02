import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
});


export const registerSchema = z.object({
  username: z.string().min(3, { message: 'Mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
});

export type RegisterForm = z.infer<typeof registerSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
