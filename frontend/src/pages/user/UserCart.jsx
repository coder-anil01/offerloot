import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserCart = () => {

  const [auth] = useAuth();
  const [products, setProducts] = useState([])

  const getCart = async()=>{
    try {
      const {data} = await axios.post("http://localhost:8000/api/v1/cart/get", {user: auth?.user?._id})
      setProducts(data.cart)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(auth?.token)getCart()
  },[auth])

  const deletCartProduct = async(id)=> {
    try {
      const {data} =await axios.delete(`http://localhost:8000/api/v1/cart/delete/${id}`)
      toast.success(data.message)
      getCart();
    } catch (error) {
      toast.info("Internal Server error")
    }
  }

  return (
    <div className='dashbord'>
      <div className='dashbord-menu'><UserMenu/></div>
      <div className='dashbord-content'>
      <div className='nav-cart-product'>
          {products?.map(item => (
            <div className='nav-cart-product-card' key={item.product._id}>
              <div className='nav-cart-product-card-left'>
                <Link to={`/product/${item.product._id}`}><img className='nav-cart-product-image' src={item.product.image} alt="" /></Link>
                <div className='nav-cart-product-text'>
                  <div className='nav-cart-product-title'>{item.product.title.slice(0,20)}...</div>
                  <div className='nav-cart-product-price'>₹ {item.product.price}/-</div>
                </div>
              </div>
              <button className='nav-cart-product-remove' onClick={()=>{deletCartProduct(item._id)}}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserCart
