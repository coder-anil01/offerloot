import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom';

const UserOrder = () => {

  const[orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getAllOrders = async()=> {
    try {
      const {data} = await axios.post('http://localhost:8000/api/v1/order/user-order', {id: auth?.user._id})
      console.log(data.orders)
      setOrders(data.orders)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllOrders();
  },[auth])
  return (
    <div className='dashbord'>
      <div className='dashbord-menu'><UserMenu/></div>
      <div className='dashbord-content'>
      <div className='nav-cart-product'>
          {orders?.map(item => (
            <div className='nav-cart-product-card' key={item.product._id}>
              <div className='nav-cart-product-card-left'>
                <Link to={`/product/${item.product._id}`}><img className='nav-cart-product-image' src={item.product.image} alt="" /></Link>
                <div className='nav-cart-product-text'>
                  <div className='nav-cart-product-title'>{item.product.title.slice(0,20)}...</div>
                  <div className='nav-cart-product-price'>₹ {item.price}/-</div>
                  <div className='nav-cart-product-price'><strong>Status:-</strong>{item.status}</div>
                </div>
              </div>
              <button className='nav-cart-product-remove' >Cancle</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserOrder
