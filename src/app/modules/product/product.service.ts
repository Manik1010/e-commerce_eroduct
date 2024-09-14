import TProduct from "./product.interface";
import ProductModel from "./product.model";
import { isValidObjectId } from "mongoose";

// Create a product in the database
const createProductIntoDB = async (product: TProduct) => {
    try {
        const result = await ProductModel.create(product);
        return result;
    } catch (err: unknown) {  // Changed from 'any' to 'unknown'
        // Log the error for debugging
        console.error('Error creating product:', err);

        // Type-check and re-throw the error
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error('An unknown error occurred while creating the product.');
        }
    }
};

// Get all products from the database
const getAllProductsIntoDB = async () => {
    const products = await ProductModel.find();
    return products;
};

// Get a single product by ID from the database
const getSingleProductIntoDB = async (id: string) => {
    if (!isValidObjectId(id)) {
        throw new Error("Invalid product ID");
    }
    const result = await ProductModel.findOne({ _id: id });
    return result;
};

// Update a product by ID in the database
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

// Delete a product by ID from the database
const deleteProductIntoDB = async (id: string) => {
    if (!isValidObjectId(id)) {
        throw new Error("Invalid product ID");
    }
    const result = await ProductModel.deleteOne({ _id: id });
    return result;
};

// Search for products based on a search term
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
