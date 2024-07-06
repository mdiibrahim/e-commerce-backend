import { IProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductInDB = async (product: IProduct) => {
  const result = await ProductModel.create(product);
  return result;
};
const getAllProductsFromDB = async (searchTerm?: string) => {
  let query = {};
  if (searchTerm) {
    query = { $text: { $search: searchTerm } };
  }
  const result = await ProductModel.find(query);
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

const updateProductInDB = async (
  _id: string,
  productData: Partial<IProduct>
) => {
  const result = await ProductModel.findByIdAndUpdate(_id, productData);
  return result;
};

export const ProductServices = {
  createProductInDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteSingleProductFromDB,
  updateProductInDB,
};
