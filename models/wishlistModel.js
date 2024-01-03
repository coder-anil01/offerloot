import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    product:{
        type: mongoose.Types.ObjectId,
        ref: "products",
    }
})

export default mongoose.model('wishlist', wishlistSchema)