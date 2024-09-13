import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

// Calls the controller function to create a product
router.post('/', ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProducts)

export const ProductRoutes = router;
