// import express from 'express';
// import { ProductControllers } from './product.controller';

// const router =  express.Router();


// // Will call controller function....
// router.post('/create-product', ProductControllers.createProduct);

// export const ProductRoutes = router;
// // router nijei akta object. Tai e khane kono object dorkar nai. 



// product.route.ts
import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

// Calls the controller function to create a product
router.post('/create-product', ProductControllers.createProduct);

export const ProductRoutes = router;
