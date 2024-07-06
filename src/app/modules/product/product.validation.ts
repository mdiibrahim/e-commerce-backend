import { z } from 'zod';

const variantValidationSchema = z.object({
  type: z.string().min(3),
  value: z.string().min(3),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().int().nonnegative(),
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z.string().max(20),
  description: z.string().min(5),
  price: z.number().positive(),
  category: z.string().min(3),
  tags: z.array(z.string().min(3)),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
});

const updateProductValidationSchema = productValidationSchema.partial();

export const ProductValidation = {
  productValidationSchema,
  updateProductValidationSchema,
};
