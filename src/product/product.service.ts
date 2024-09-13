// product.service.ts
import TProduct from "./product.interface";
import ProductModel from "./product.model";
import { isValidObjectId } from "mongoose";

const createProductIntoDB = async (product: TProduct) => {
    const result = await ProductModel.create(product);
    return result;
};

const getAllProductsIntoDB = async () => {
    const products = await ProductModel.find();
    return products;
}
const getSingleProductIntoDB = async (id: string) => {
    if (!isValidObjectId(id)) {
        throw new Error("Invalid product ID");
    }
    const result = await ProductModel.findOne({ _id: id });
    return result;
}


const searchProducts = async (searchTerm: string): Promise<TProduct[]> => {
    const regex = new RegExp(searchTerm, 'i');
    const products = await ProductModel.find({
        $or: [
            { name: { $regex: regex } },
            { description: { $regex: regex } },
            { category: { $regex: regex } },
        ]
    });
    return products;
};

export const ProductServices = {
    createProductIntoDB,
    getAllProductsIntoDB,
    getSingleProductIntoDB,
    searchProducts,
};
