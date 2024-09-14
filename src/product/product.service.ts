// product.service.ts
import TProduct from "./product.interface";
import ProductModel from "./product.model";
import { isValidObjectId } from "mongoose";

// const createProductIntoDB = async (product: TProduct) => {
//     const result = await ProductModel.create(product);
//     return result;
// };
const createProductIntoDB = async (product: TProduct) => {
    try {
        const result = await ProductModel.create(product);
        return result;
    } catch (err: any) {
        // Log the error for debugging
        console.error('Error creating product:', err);

        // Re-throw the error to the controller to send the response
        throw new Error(err.message);
    }
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

const updateProductIntoDB = async (productId: string, updatedProduct: TProduct) => {
    if (!isValidObjectId(productId)) {
        throw new Error("Invalid product ID");
    }
    const result = await ProductModel.findByIdAndUpdate(
        productId,
        { $set: updatedProduct },
        { new: true, runValidators: true }
    );
    return result;
};

const deleteProductIntoDB = async (id: string) => {
    if (!isValidObjectId(id)) {
        throw new Error("Invalid product ID");
    }
    const result = await ProductModel.deleteOne({ _id: id });
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
    updateProductIntoDB,
    deleteProductIntoDB,
};
