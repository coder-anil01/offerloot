import orderModel from "../models/orderModel.js";

//*************  CREATE   *************//
export const createOrder = async(req, res) => {
    const {cart, price, id} = req.body;
    try {
        for (let i = 0; i < cart.length; i++) {
            await new orderModel({products: cart[i], price: cart[i]?.price, user: id }).save();
        }
        res.status(201).send({
            success: true,
            message: "congratulations Order Conform",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error While Registation",
            error,
          });
    }
}

//*************  GET   *************//
export const getAllOrder = async(req, res) => {
    try {
        const order = await orderModel.find({}).populate("products").populate("user").sort({ createdAt: -1});
        res.status(201).send({
            success: true,
            message: "All Orders",
            total: order.length,
            order,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error While Registation",
            error,
          });
    }
}

//*************  GET user All Orders   *************//
export const userAllOrders = async(req, res)=>{
    try {
        const {id} = req.body
        if(!id){
            return res.status(404).send("plese enter user id")
        }
        const orders = await orderModel.find({user: id}).populate("products").sort({ createdAt: -1});
        res.status(200).send({
            success: true,
            message: "User All Order",
            totalOrders: orders.length,
            orders,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error While Registation",
            error,
          });
    }
}

//*************  Update   *************//
export const updateStaus = async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const update = await orderModel.findByIdAndUpdate(id, {status},{new: true})
        res.status(200).send({
            success: true,
            message: "Order Status Updated",
            update,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error While Registation",
            error,
          });
    }
}