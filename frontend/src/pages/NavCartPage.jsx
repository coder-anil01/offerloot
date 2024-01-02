import React, { useEffect, useState } from 'react'
import '../style/NavCartPage.css'
import { useAuth } from '../context/auth'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import Cartimage from '../image/pngwing.com.png'
import { FaHome, FaUser,FaPhoneAlt } from "react-icons/fa";




const NavCartPage = () => {

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

  const totalPrice =()=> {
    try {
      let total = 0;
      products?.map((e)=>{
        total = total + e.product.price;
      });
      return total
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='nav-cart'>
      <div className='nav-cart-left'>
        <div className='nav-cart-address'>
          <div>
            <div><FaUser/> <strong>Buyer:-</strong> {auth?.user?.name}</div>
            <div><FaPhoneAlt/> <strong>Phone:-</strong> {auth?.user?.phone}</div>
            <div><FaHome/> <strong>Address:-</strong> {auth?.user?.address}</div>
          </div>
          <Link to='/dashbord/profile' className='nav-cart-address-change'>Change</Link>
        </div>
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
      <div className='nav-cart-right'>
        <div>
          <h2>Price Details</h2>
          <h3>Total Price:- ₹ {totalPrice()}/-</h3>
        </div>
        {products.length > 0 ? <>
          <Link to="/dashbord/payment" className='nav-cart-place-order'>Place Order</Link>
          </> : <>
          <Link to="/" className='nav-cart-place-order'>Continue Shopping</Link>
          </>}
        
      </div>
    </div>
  )
}

export default NavCartPage
