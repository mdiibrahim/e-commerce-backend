import { Request, Response } from 'express';
import { ProductServices } from './product.services';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const result = await ProductServices.createProductInDB(product);

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

export const ProductController = {
  createProduct,
};
