import { z } from 'zod';

export const ProductStatusSchema = z.enum(["available", "out_of_stock", "discontinued"], { message: 'El estado del producto debe ser available, out_of_stock o discontinued' });

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'Nombre muy corto'),
  description: z.string().min(5, 'Descripción muy corta'),
  price: z.number({ invalid_type_error: 'Debe ser un número' }).positive('Debe ser positivo'),
  userId: z.string().optional(),
  status: ProductStatusSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductStatus = z.infer<typeof ProductStatusSchema>;
