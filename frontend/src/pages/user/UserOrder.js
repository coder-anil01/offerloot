import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { IoMdCheckmarkCircle } from "react-icons/io";


const UserOrder = () => {

  const[orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[cancle, setCancle] = useState("");
  const[orderid, setOrderid] = useState("");
  const id= orderid;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const {data} =await axios.put(`http://localhost:8000/api/v1/order/update/${id}`, {status: cancle})
      console.log(id)
      console.log(cancle)
      setIsModalOpen(false);
      getAllOrders();
      toast.success("Order Item Cancelled")
    } catch (error) {
      toast.error("Internal Server Error")
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


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
                  <div className='nav-cart-product-title'>{item.product.title.slice(0,25)}...</div>
                  <div className='nav-cart-product-price'><strong>Price:- </strong>₹ {item.price}/-</div>
                  <div className='order-product-status'><strong>Status:- </strong>
                  {item.status.slice(0,6) == "Cancle" ? <div className='order-product-status-icon-cancle'><IoMdCheckmarkCircle/> </div> : <div className='order-product-status-icon'><IoShieldCheckmarkSharp/> </div> }
                   {item.status}</div>
                  <div className='nav-cart-product-price'><strong>Payment:- </strong>{item.payment}</div>
                </div>
              </div>
              <button onClick={()=> {showModal(); setOrderid(item._id)}} className='nav-cart-product-remove' >Cancle</button>
            </div>
          ))}
        </div>
      </div>
      <Modal title="Why you Want to cancle" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <select className='dashbord-order-cancle-select' onChange={(e)=> {setCancle(e.target.value)}}>
          {/* <option value="">--Please choose an option--</option> */}
          <option value="" disabled selected>Select an option</option>
          <option value="Cancle:- I Am Just Tasting"> &#x21e8; I Am Just Tasting</option>
          <option value="Cancle:- Order Wrong Product">&#x21e8; Order Wrong Product</option>
          <option value="Cancle:- Change My Mind"> &#x21e8; Change My Mind</option>
          <option value="Cancle:- Longer Deliveries"> &#x21e8; Longer Deliveries</option>
          <option value="Cancle:- I Have No Money"> &#x21e8; I Have No Money</option>
        </select>
      </Modal>
    </div>
  )
}

export default UserOrder
