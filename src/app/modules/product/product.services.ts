import { IProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductInDB = async (product: IProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

export const ProductServices = {
  createProductInDB,
};
