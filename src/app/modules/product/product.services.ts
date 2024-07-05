import { IProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductInDB = async (product: IProduct) => {
  const result = await ProductModel.create(product);
  return result;
};
const getAllProductsFromDB = async () => {
  const result = await ProductModel.find({});
  return result;
};
const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  return result;
};
const deleteSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOneAndDelete({ _id: id });
  return result;
};

export const ProductServices = {
  createProductInDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteSingleProductFromDB,
};
