//controller
import { Request, Response } from 'express';
import { OrderServices } from './order.services';
import { OrderValidation } from './order.validation';
import { Types } from 'mongoose';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const zodParseOrder = OrderValidation.orderValidationSchema.parse(order);
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
