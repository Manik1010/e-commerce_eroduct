// import { Schema, model } from 'mongoose';
// import TProduct, { ProductInventory, ProductVariant } from './product.interface';
// const productVarientSchema = new Schema<ProductVariant>(
//     {
//         type: { type: String, required: true },
//         value: { type: String, required: true },
//     },
//     { _id: false }
// )
// const productInventorySchema = new Schema<ProductInventory>(
//     {
//         quantity: { type: Number, required: true },
//         inStock: { type: Boolean, required: true }
//     },
//     { _id: false }
// )
// const productSchema = new Schema<TProduct>({
//     name: {
//         type: String,
//         trim: true,
//         minlength: [6, 'Name must be at least 6 characters'],
//         maxlength: [20, 'Name must be at most 20 characters'],
//         unique: true,
//         required: [true, "Name is required"]
//     },
//     description: { type: String, required: [true, "description is required"] },
//     price: { type: Number, required: [true, "price is required"] },
//     category: { type: String, required: [true, "category is required"] },
//     tags: { type: [String], required: [true, "tags are required"] },
//     variants: { type: [productVarientSchema], required: [true, "Variants are required"] },
//     inventory: { type: productInventorySchema, required: [true, "Inventory are required"] },

// })
// const ProductModel = model<TProduct>('products', productSchema);
// export default ProductModel;
// product.model.ts
import { Schema, model } from 'mongoose';
import TProduct, { ProductInventory, ProductVariant } from './product.interface';

const productVariantSchema = new Schema<ProductVariant>(
    {
        type: { type: String, required: true },
        value: { type: String, required: true },
    },
    { _id: false }
);

const productInventorySchema = new Schema<ProductInventory>(
    {
        quantity: { type: Number, required: true },
        inStock: { type: Boolean, required: true },
    },
    { _id: false }
);

const productSchema = new Schema<TProduct>({
    name: {
        type: String,
        trim: true,
        minlength: [6, 'Name must be at least 6 characters'],
        maxlength: [20, 'Name must be at most 20 characters'],
        unique: true,
        required: [true, "Name is required"],
    },
    description: { type: String, required: [true, "Description is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    category: { type: String, required: [true, "Category is required"] },
    tags: { type: [String], required: [true, "Tags are required"] },
    variants: { type: [productVariantSchema], required: [true, "Variants are required"] },
    inventory: { type: productInventorySchema, required: [true, "Inventory is required"] },
});

const ProductModel = model<TProduct>('products', productSchema);
export default ProductModel;
