import { Request, Response } from "express";
import { ZodError } from "zod";
import TOrder from "./order.interface";
import { OrderServices } from "./order.service";
import orderValidationSchema from "./order.validation";

const addOrder = async (req: Request, res: Response) => {
    try {
        const order = req.body;
        const validateOrderData = orderValidationSchema.parse(order);
        if (!validateOrderData.email || !validateOrderData.productId || !validateOrderData.price || !validateOrderData.quantity) {
            throw new Error("All fields are required");
        }
        const result = await OrderServices.addOrderIntoDB(validateOrderData);
        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: result
        })
    } catch (err: unknown) {  // Changed from 'any' to 'unknown'
        if (err instanceof ZodError) {
            res.status(400).json({
                success: false,
                message: err.errors[0].message,
                error: err.errors,
            });
        } else if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message,
                error: err
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: err
            });
        }
    }
}

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const searchTerm: string = req.query.email as string;
        let orders: TOrder[];
        let message: string;
        if (searchTerm) {
            orders = await OrderServices.searchOrdersByEmail(searchTerm);
            message = `Orders fetched successfully for user email : '${searchTerm}'`
        } else {
            orders = await OrderServices.getAllOrdersIntoDB();
            message = 'Orders fetched successfully!'
        }
        res.status(200).json({
            success: true,
            message: message,
            data: orders
        });
    } catch (err: unknown) {  // Changed from 'any' to 'unknown'
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message,
                error: err
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: err
            });
        }
    }
}

const getOrderByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const result = await OrderServices.searchOrdersByEmail(email)
        if (result) {
            res.status(200).json({
                success: true,
                message: "Product fetched successfully!",
                data: result
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        }

    } catch (err: unknown) {  // Changed from 'any' to 'unknown'
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: err.message,
                error: err
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: err
            });
        }
    }
}

export const OrderControllers = {
    addOrder,
    getAllOrders,
    getOrderByEmail,
}
