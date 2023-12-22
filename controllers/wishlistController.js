import wishListModel from "../models/wishListModel.js";

export const createwishlist = async (req, res) => {
    try {
        const { user, product} = req.body;
        const exist = await wishListModel.findOne({"product": product})
        if(exist){
            return res.status(200).send({message: "Product Exist In Wishlist"})
        }
        const wishlist = await new wishListModel({user, product}).save();
        res.status(201).send({
            success: true,
            message: "Added Product In Wishlist",
            wishlist,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: "Internal Server Error",
            error,
        })
    }
}

export const userwishlist = async (req, res) => {
    try {
        const {id} = req.params;
        const wishlist = await wishListModel.find({"user": id}).populate('product').select("-user").sort({ createdAt: -1})
        res.status(200).send({
            success: true,
            message: "Get All wishlist",
            wishlist,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error,
        })
    }
}
export const userwishlistRemove = async (req, res) => {
    try {
        const {id} = req.params;
        await wishListModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Remove Product from wishlist",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error,
        })
    }
}