import { isValidObjectId } from "mongoose";
import ProductModel from "../product/product.model";
import TOrder from "./order.interface";
import OrderModel from "./order.model";

const addOrderIntoDB = async (order: TOrder) => {
    const { productId, quantity, price } = order;

    // Check if the productId is a valid ObjectId
    if (!isValidObjectId(productId)) {
        throw new Error("Invalid product ID");
    }

    // Find the product by its ID
    const product = await ProductModel.findById(productId);

    // Check if the product exists
    if (!product) {
        throw new Error("Invalid product ID. This product ID could not be found in the database");
    }

    // Check if the product is in stock
    if (product.inventory.quantity < quantity) {
        throw new Error("Insufficient quantity available in inventory.");
    }
    // Calculate the total price based on the price and quantity provided
    const totalPrice = price * quantity;
    // Update the quantity of the product in the ProductModel
    const updatedQuantity = product.inventory.quantity - quantity;
    await ProductModel.findByIdAndUpdate(productId, { "inventory.quantity": updatedQuantity });

    // Update the inStock field based on the updated quantity
    const inStock = updatedQuantity > 0;

    // Update inStock field in the ProductModel
    await ProductModel.findByIdAndUpdate(productId, { "inventory.inStock": inStock });

    // Create the order
    const result = await OrderModel.create({ ...order, price: totalPrice });
    return result;
};
const getAllOrdersFromDB = async () => {
    const orders = await OrderModel.find();
    return orders;
}
const searchOrdersByEmail = async (searchTerm: string): Promise<TOrder[]> => {

    const regex = new RegExp(searchTerm, 'i');
    const orders = await OrderModel.find({ email: { $regex: regex } });
    if (orders.length === 0) {
        throw new Error(`No orders found matching the search user email:${searchTerm}`);
    }

    return orders;

};

export const OrderServices = {
    addOrderIntoDB,
    getAllOrdersFromDB,
    searchOrdersByEmail
};
