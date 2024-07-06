//controller
import { Request, Response } from 'express';
import { OrderServices } from './order.services';
import { OrderValidation } from './order.validation';
import { Types } from 'mongoose';

//creating order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    // Validate the 'order' data using Zod schema
    const zodParseOrder = OrderValidation.orderValidationSchema.parse(order);

    //convert the productId into mongoDB ObjectId format
    const orderDataWithObjectId = {
      ...zodParseOrder,
      productId: new Types.ObjectId(zodParseOrder.productId),
    };
    const result = await OrderServices.createOrderInDB(orderDataWithObjectId);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === 'Product not found') {
      res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    } else if (
      error.message === 'Insufficient quantity available in inventory'
    ) {
      res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory!',
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

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    // Retrieve All Orders or Retrieve Orders by User Email
    const filter = email ? (email as string) : undefined;
    const result = await OrderServices.getAllOrdersFromDB(filter);
    const message = email
      ? 'Orders fetched successfully for user email!'
      : 'Orders fetched successfully!';
    res.status(200).json({
      success: true,
      message,
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === 'Orders not found') {
      res.status(404).json({
        success: false,
        message: 'Orders not found',
      });
    } else if (error.message === 'Orders not found for the provided email') {
      res.status(404).json({
        success: false,
        message: 'Orders not found for the provided email',
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

export const OrderController = {
  createOrder,
  getAllOrders,
};
