import { z } from 'zod';

const variantValidationSchema = z.object({
  type: z.string().min(3, 'Variant type must be at least 3 characters long'),
  value: z.string().min(3, 'Variant value must be at least 3 characters long'),
});

const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative integer'),
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(20, 'Product name must not exceed 20 characters'),
  description: z
    .string()
    .min(5, 'Description must be at least 5 characters long'),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(3, 'Category must be at least 3 characters long'),
  tags: z.array(
    z.string().min(3, 'Each tag must be at least 3 characters long')
  ),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
});

const updateProductValidationSchema = productValidationSchema.partial();

export const ProductValidation = {
  productValidationSchema,
  updateProductValidationSchema,
};
