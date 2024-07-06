import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderInDB = async (order: IOrder) => {
  const orderedProduct = await Product.findOne(order.productId);
  if (!orderedProduct) {
    throw new Error('Product not found');
  }

  if (order.quantity > orderedProduct?.inventory?.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }
  const newQuantity = orderedProduct.inventory.quantity - order.quantity;
  if (newQuantity == 0) {
    await Product.updateOne(
      { _id: order.productId },
      { 'inventory.inStock': false }
    );
  }
  await Product.updateOne(
    { _id: order.productId },
    { 'inventory.quantity': newQuantity }
  );
  const result = await OrderModel.create(order);
  return result;
};
const getAllOrdersFromDB = async (email?: string | undefined) => {
  const result = email
    ? await OrderModel.find({ email })
    : await OrderModel.find({});
  if (!result) {
    throw new Error('Orders not found');
  }
  return result;
};

export const OrderServices = {
  createOrderInDB,
  getAllOrdersFromDB,
};
