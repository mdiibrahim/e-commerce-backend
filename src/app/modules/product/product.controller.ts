import { Request, Response } from 'express';
import { ProductServices } from './product.services';
import { ProductValidation } from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const zodParseProduct =
      ProductValidation.productValidationSchema.parse(product);
    const result = await ProductServices.createProductInDB(zodParseProduct);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error!!!',
      error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const message = searchTerm
      ? `Products matching search term ${searchTerm} fetched successfully!`
      : 'Products fetched successfully!';

    const filter = searchTerm ? (searchTerm as string) : undefined;
    const result = await ProductServices.getAllProductsFromDB(filter);

    res.status(200).json({
      success: true,
      message,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error!!!',
      error,
    });
  }
};
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error!!!',
      error,
    });
  }
};
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    await ProductServices.deleteSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error!!!',
      error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    const zodParseUpdateProduct =
      ProductValidation.updateProductValidationSchema.parse(productData);
    const result = await ProductServices.updateProductInDB(
      productId,
      zodParseUpdateProduct
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error!!!',
      error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  updateProduct,
};
