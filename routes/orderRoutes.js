import express from "express";
import { createOrder, getAllOrder, updateStaus, userAllOrders } from "../controllers/orderController.js";



//router object
const router = express.Router();

router.post("/create", createOrder)

router.get("/get-all", getAllOrder)

router.post("/user-order", userAllOrders)

router.put("/update/:id", updateStaus)

export default router;