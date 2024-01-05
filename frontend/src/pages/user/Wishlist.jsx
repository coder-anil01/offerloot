import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCartPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const Wishlist = () => {

  const [product, setProduct] = useState([]);
  const[auth] = useAuth();

  // get
  const getWishlist = async() => {
    try {
      const {data} = await axios.post(`/api/v1/wishlist/get/${auth?.user._id}`)
      console.log(data.wishlist)
      setProduct(data.wishlist)
    } catch (error) {
      toast.error("Internal Server Error")
    }
  }

  useEffect(()=>{
    getWishlist();
  },[auth])

  // CART 
  const addToCart = async(id) => {
    try {
      const {data} = await axios.post("/api/v1/cart/create", {product: id, user: auth?.user._id})
      if(data.success){
        toast.success(data.message)
      }else{
        toast.info(data.message)
      }
    } catch (error) {
      toast.error("Internal Server Error")
    }
  }

  const handleDelete = async(id)=>{
    try {
      const {data} = await axios.delete(`/api/v1/wishlist/delete/${id}`)
      if(data.success){
        toast.info(data.message)
        getWishlist();
      }else{
        toast.info(data.message)
      }
    } catch (error) {
      
    }
  }

  return (
    <div className='dashbord'>
      <div className='dashbord-menu'><UserMenu/></div>
      <div className='dashbord-content'>
      <div className="product-box">
        {product?.map(p => (
          <div key={p.product._id} className="product-box-card">
            <div className="product-box-image-main">
              <img className="product-box-image" src={p.product.image} alt={p.product.title.slice(0, 8)}/>
            </div>
            <div className="product-box-text">
            <div className="product-card-icon">
                <div className="product-icon-wishlist" onClick={() => {handleDelete(p._id)}}><MdDelete/></div>
                <div className="product-icon-cart" onClick={() => {addToCart(p.product._id)}}><FaCartPlus/></div>
              </div>
              <div className="product-box-title">{p.product.title.slice(0, 10)}...</div>
              <div className="product-box-price">{p.product.price}</div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default Wishlist
