import { Request, Response } from 'express';
import { OrderServices } from './order.services';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const result = await OrderServices.createOrderInDB(order);
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
