import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email è obbligatoria')
    .email('Email non valida'),
  password: z
    .string()
    .min(8, 'La password deve essere di almeno 8 caratteri')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'La password deve contenere almeno una lettera maiuscola, una minuscola e un numero'
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
