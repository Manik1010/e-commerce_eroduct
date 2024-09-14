
import express from "express";
import { OrderControllers } from "./order.controller";


const router = express.Router();

router.post("", OrderControllers.addOrder);
router.get("", OrderControllers.getAllOrders);
router.get("/email", OrderControllers.getOrderByEmail);

export const OrderRoutes = router;
