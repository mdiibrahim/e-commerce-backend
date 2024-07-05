import { IOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderInDB = async (order: IOrder) => {
  const result = await OrderModel.create(order);
  return result;
};
const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find({});
  return result;
};

export const OrderServices = {
  createOrderInDB,
  getAllOrdersFromDB,
};
