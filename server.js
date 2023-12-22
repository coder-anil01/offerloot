import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './db.js';
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import cors from "cors"

//config
dotenv.config()
connectDB();

//rest object
const app = express();

//midleware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//******* */ =>  ROUTES
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRoute )
app.use('/api/v1/product', productRoutes )
app.use('/api/v1/order', orderRoutes )
app.use('/api/v1/wishlist', wishlistRoutes )

//rest api
app.get('/', (req, res)=> {
    res.send({
        message: "Welcome on home page"
    })
})

const PORT = process.env.PORT || 8080;

//Listen
app.listen(PORT, ()=> {
    console.log(`Server Runing on ${process.env.DEV_MODE} mode on port ${PORT}`)
})