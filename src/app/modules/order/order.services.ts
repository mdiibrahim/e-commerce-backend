import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderInDB = async (order: IOrder) => {
  // Find the ordered product in the database
  const orderedProduct = await Product.findOne(order.productId);
  if (!orderedProduct) {
    throw new Error('Product not found');
  }

  // Check if the ordered quantity greater than the available product quantity
  if (order.quantity > orderedProduct?.inventory?.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  const newQuantity = orderedProduct.inventory.quantity - order.quantity;
  // If the new quantity is zero, inStock will false
  if (newQuantity == 0) {
    await Product.updateOne(
      { _id: order.productId },
      { 'inventory.inStock': false },
    );
  }
  await Product.updateOne(
    { _id: order.productId },
    { 'inventory.quantity': newQuantity },
  );
  const createdOrder = await OrderModel.create(order);

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { _id, ...result } = createdOrder.toObject();
  return result;
};

const getAllOrdersFromDB = async (email?: string | undefined) => {
  const result = email
    ? await OrderModel.find({ email }, { _id: 0 }) // Retrieve All Orders
    : await OrderModel.find({}, { _id: 0 }); // or Retrieve Orders by User Email
  if (result.length === 0) {
    throw new Error(
      email ? 'Orders not found for the provided email' : 'Orders not found',
    );
  }
  return result;
};

export const OrderServices = {
  createOrderInDB,
  getAllOrdersFromDB,
};
