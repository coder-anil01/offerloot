import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        products: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'products',
            },
        price:{
            type: Number,
            // require: true,
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            // require: true,
        },
        status:{
            type:String,
            default: "Processing",
        }
        
    },{timestamps: true}
)

export default mongoose.model('order', orderSchema)