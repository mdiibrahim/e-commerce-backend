import { model, Schema } from 'mongoose';
import { IInventory, IProduct, IVariant } from './product.interface';

const variantsSchema = new Schema<IVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const inventorySchema = new Schema<IInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});
const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: [variantsSchema],
  inventory: inventorySchema,
});

export const ProductModel = model<IProduct>('Product', productSchema);
