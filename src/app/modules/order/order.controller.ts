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
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'Server error!!!',
      data: error,
    });
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
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'Server error!!',
      data: error,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
