import React, { useEffect, useState } from 'react'
import '../../style/NavCartPage.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { FaHome, FaUser,FaPhoneAlt } from "react-icons/fa";
import { useAuth } from '../../context/auth';


const PaymentPage = () => {

    const [auth] = useAuth();
  const [products, setProducts] = useState([])

  const getCart = async()=>{
    try {
      const {data} = await axios.post("http://localhost:8000/api/v1/cart/get", {user: auth?.user?._id})
      console.log(data)
      setProducts(data.cart)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(auth?.token)getCart()
  },[auth])

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
          <Link to='/dashbord' className='nav-cart-address-change'>Change</Link>
        </div>
        <div className='nav-cart-product'>

        </div>
      </div>
      <div className='nav-cart-right'>
        <div>
          <h2>Price Details</h2>
          <h3>Total Price:- ₹ {totalPrice()}/-</h3>
        </div>
        <Link to="/dashbord/payment" className='nav-cart-place-order'>Conform Order</Link>
      </div>
    </div>
  )
}

export default PaymentPage
