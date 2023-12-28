import express from "express";
import { addToCart, deleteCart, getCart } from "../controllers/CartController.js";

//router object
const router = express.Router();

router.post("/create", addToCart);

router.post("/get", getCart)

router.delete("/delete/:id", deleteCart)


export default router;
