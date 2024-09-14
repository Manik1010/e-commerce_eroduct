import { Schema, model } from 'mongoose';
import TOrder from './order.interface';

const orderSchema = new Schema<TOrder>({
    email: {
        type: String,
        required: [true, "email is required"]
    },
    productId: { type: String, required: [true, "Product id is required"] },
    price: { type: Number, required: [true, "price is required"] },
    quantity: { type: Number, required: [true, "Quantity is required"] }


})
const OrderModel = model<TOrder>('orders', orderSchema);
export default OrderModel;
