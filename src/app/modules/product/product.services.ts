// services
import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductInDB = async (product: IProduct) => {
  if (await Product.isProductExists(product.name)) {
    throw new Error('Product already exists!');
  }
  return await Product.create(product);
};

const getAllProductsFromDB = async (searchTerm?: string) => {
  const query = searchTerm ? { $text: { $search: searchTerm } } : {};
  if (!query) {
    throw new Error('Product not found');
  }
  return await Product.find(query);
};

const getSingleProductFromDB = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

const deleteSingleProductFromDB = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

const updateProductInDB = async (
  id: string,
  productData: Partial<IProduct>
) => {
  const product = await Product.findByIdAndUpdate(id, productData, {
    new: true,
  });
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

export const ProductServices = {
  createProductInDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteSingleProductFromDB,
  updateProductInDB,
};
