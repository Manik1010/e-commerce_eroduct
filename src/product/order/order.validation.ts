import { z } from "zod";


const orderValidationSchema = z.object({

    email: z.string().nonempty("Email is required").email("Email is not valid"),
    productId: z.string().nonempty("Product Id is required"),
    price: z.number().positive("Price must be a positive number"),
    quantity: z.number().positive("Quantity must be a positive number")

})
export default orderValidationSchema;
