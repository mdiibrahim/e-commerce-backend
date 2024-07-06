// controller
import { Request, Response } from 'express';
import { ProductServices } from './product.services';
import { ProductValidation } from './product.validation';

//creating product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    // Validate the 'product' data using Zod schema
    const zodParseProduct =
      ProductValidation.productValidationSchema.parse(product);
    const result = await ProductServices.createProductInDB(zodParseProduct);

    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === 'Product already exists!') {
      res.status(400).json({
        success: false,
        message: 'Product already exists!',
      });
    } else if (error.name === 'ZodError') {
      res.status(400).json({
        success: false,
        message: 'Validation error!',
        error: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Server error!!!',
        error,
      });
    }
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const message = searchTerm
      ? `Products matching search term '${searchTerm}' fetched successfully!`
      : 'Products fetched successfully!';

    // Retrieve All products or Retrieve Orders by searching
    const filter = searchTerm ? (searchTerm as string) : undefined;
    const result = await ProductServices.getAllProductsFromDB(filter);

    res.status(200).json({
      success: true,
      message,
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === 'Product not found') {
      res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    } else if (error.name === 'ZodError') {
      res.status(400).json({
        success: false,
        message: 'Validation error!',
        error: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Server error!!!',
        error,
      });
    }
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === 'Product not found') {
      res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    } else if (error.name === 'ZodError') {
      res.status(400).json({
        success: false,
        message: 'Validation error!',
        error: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Server error!!!',
        error,
      });
    }
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await ProductServices.deleteSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === 'Product not found') {
      res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    } else if (error.name === 'ZodError') {
      res.status(400).json({
        success: false,
        message: 'Validation error!',
        error: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Server error!!!',
        error,
      });
    }
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    // Validate updated 'product' data using Zod schema
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === 'Product not found') {
      res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    } else if (error.name === 'ZodError') {
      res.status(400).json({
        success: false,
        message: 'Validation error!',
        error: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Server error!!!',
        error,
      });
    }
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  updateProduct,
};
