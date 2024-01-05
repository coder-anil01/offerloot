import { FaUser, FaHome, FaPhoneAlt } from "react-icons/fa";
import moment from "moment";
import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Select } from "antd";
import { toast } from "react-toastify";
const { Option } = Select;


const AllOrders = () => {

  const [orders, setOrders] = useState([]);
  const[total, setTotal] = useState(0);
  const allOrders = async() => {
    try {
      const {data} = await axios.get('/api/v1/order/get-all')
      setOrders(data?.order)
      setTotal(data?.total)
    } catch (error) {
      
    }
  }

  useEffect(()=> {
    allOrders();
  },[])

  const handleChange = async (id, value) => {
    try {
      const { data } = await axios.put(`/api/v1/order/update/${id}`, {status: value});
      toast.success(data?.message)
    } catch (error) {
      toast.error("Internal Server Error");
    }
  };

  const options = { 
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false // 24-hour format
  };

  return (
    <div className='dashbord'>
      <div className='dashbord-menu'><AdminMenu/></div>
      <div className='dashbord-admin-product-contain'>
      <h2 className='dashbord-form-heading'>All Orders:- {total}</h2>
      <div className='dashbord-admin-order-content'>
          {orders?.map(item => (
            <div className='dashbord-admin-order-card' key={item?.product?._id}>
                <Link className="dashbord-admin-order-image-main" to={`/product/${item?.product?._id}`}><img className='dashbord-admin-order-image' src={item?.product?.image} alt="" /></Link>
                <div className='dashbord-admin-order-text'>
                  <div className="dashbord-admin-order-id"> <strong>Order Id:- </strong>{item?._id}</div>
                  <div className='dashbord-admin-order-title'>{item?.product?.title.slice(0,30)}...</div>
                  <div className='dashbord-admin-order-price'><strong>Price:- </strong>₹ {item?.price}/-</div>
                  <div className='dashbord-admin-order-payment'><strong>Payment:- </strong>{item?.payment}</div>
                  <div className="dashbord-admin-order-date"><strong>Date:- </strong>{new Date(item?.createdAt).toLocaleDateString('en-US', options)}</div>
                  <div className='dashbord-admin-order-status'><strong>Status:- </strong>
                  <Select
                    defaultValue={item?.status}
                    className='dashbord-admin-order-status-select'
                    style={{width: "150px", marginLeft: "10px"}}
                    onChange={(value) => handleChange(item?._id, value)}>
                      <Option value="Processing">Processing</Option>
                      <Option value="Shipped">Shipped</Option>
                      <Option value="Out Of Delivery">Out Of Delivery</Option>
                      <Option value="Delivered">Delivered</Option>
                      <Option value="Out Of Stock">Out Of Stock</Option>
                      <Option value="Pending">Pending</Option>
                      <Option value="Cancelled">Cancelled</Option>
                      <Option value="Refunded">Refunded</Option>
                      <Option value="Return">Return</Option>
                  </Select>
                  </div>
                </div>
                <div className="dashbord-admin-order-text">
                  <div className="dashbord-admin-order-user-name"><FaUser/> {item?.user.name}</div>
                  <div className="dashbord-admin-order-user-phone"><FaPhoneAlt/> {item?.user.phone}</div>
                  <div className="dashbord-admin-order-user-home"><FaHome/> {item?.user.address}</div>
                  
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllOrders
