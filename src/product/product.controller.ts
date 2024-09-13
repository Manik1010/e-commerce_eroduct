// import { Request, Response } from "express";
// import { ProductSevices } from "./product.service";

// const createProduct = async (req: Request, res: Response) =>{

//     // const product = req.body
//     // // We call service function send this data.
//     // const result = await ProductServices.createProductIntoDB(product);

//     // // send response.
//     // res.status(200).json({
//     //     success: true,
//     //     message: 'Product is created successfully.',
//     //     data: result,
//     // });
//     try{
//         const {product: productData} = req.body;
//         console.log(productData)
//         // We call service function send this data.
//         const result = await ProductSevices.createProductIntoDB(productData);
//         // send response.
//         res.status(200).json({
//             success: true,
//             message: 'Product is created successfully.',
//             data: result,
//         })
//     }catch(err){
//         console.log(err);
//         res.status(500).json({
//             success: false,
//             message: 'An error occurred while creating the product.',
//             error: err.message
//         });
//     }
// }

// export const ProductControllers = {
//     createProduct,
// }



// product.controller.ts
import { Request, Response } from "express";
import { ProductServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
    try {
        const { product: productData } = req.body;
        console.log(productData);

        // Call the service function to save the product to the database
        const result = await ProductServices.createProductIntoDB(productData);

        // Send response
        res.status(200).json({
            success: true,
            message: 'Product is created successfully.',
            data: result,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the product.',
            error: (err as Error).message,
        });
    }
};

export const ProductControllers = {
    createProduct,
};
