// product.controller.ts
import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import TProduct from "./product.interface";

// const createProduct = async (req: Request, res: Response) => {
//     try {
//         //const { product: productData } = req.body;
//         const { product: productData } = req.body;
//         console.log(productData);

//         // Call the service function to save the product to the database
//         const result = await ProductServices.createProductIntoDB(productData);

//         // Send response
//         res.status(200).json({
//             success: true,
//             message: 'Product is created successfully.',
//             data: result,
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             success: false,
//             message: 'An error occurred while creating the product.',
//             error: (err as Error).message,
//         });
//     }
// };
const createProduct = async (req: Request, res: Response) => {
    try {
        const { product: productData } = req.body;
        console.log(productData);
        // Check if all required fields are provided
        if (!productData || !productData.name || !productData.description || !productData.price || !productData.category || !productData.inventory || !productData.variants) {
            return res.status(400).json({
                success: false,
                message: 'All required fields (name, description, price, category, tags, variants, inventory) must be provided.',
            });
        }

        // Call the service function to save the product to the database
        const result = await ProductServices.createProductIntoDB(productData);

        // Send response
        res.status(200).json({
            success: true,
            message: 'Product is created successfully.',
            data: result,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the product.',
            error: (err as Error).message,
        });
    }
};

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const searchTerm: string = req.query.searchTerm as string;
        let products: TProduct[];
        let message: string;
        if (searchTerm) {
            // Search products if a search term is provided
            products = await ProductServices.searchProducts(searchTerm);
            message = `Products matching search term '${searchTerm}' fetched successfully!`
        } else {
            // Retrieve all products if no search term is provided
            products = await ProductServices.getAllProductsIntoDB();
            message = 'Products fetched successfully!'
        }
        res.status(200).json({
            success: true,
            message: message,
            data: products
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        })
    }
}
const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const result = await ProductServices.getSingleProductIntoDB(productId)
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

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        })
    }
}
const deleteSingleProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const result = await ProductServices.deleteProductIntoDB(productId)
        if (result.deletedCount > 0) {
            res.status(200).json({
                success: true,
                message: "Product deleted successfully!",
                data: null
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        })
    }
}
const updateProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const updatedData = req.body;

        const result = await ProductServices.updateProductIntoDB(productId, updatedData);

        if (result) {
            res.status(200).json({
                success: true,
                message: 'Product updated successfully!',
                data: result
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Product not found!'
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err
        });
    }
};
export const ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteSingleProduct,
};
