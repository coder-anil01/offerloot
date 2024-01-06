import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth';
import { FaHome, FaUser,FaPhoneAlt } from "react-icons/fa";
import '../../style/PaymentBuy.css'
import { Collapse } from 'antd';
import { toast } from 'react-toastify';
import { Modal } from "antd";
import Coungraculation from "../../image/right.png";
import SeoHelmet from '../../components/SeoHelmet';


const PaymentBuy = () => {

    const params = useParams();
    const loacation = useLocation()
    const navigate = useNavigate();
    const[auth] = useAuth();
    const [product, setProduct] = useState("");
    const [showkay, setShowkey] = useState(2)
    const [isModalOpen, setIsModalOpen] = useState(false);

     // All Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get/${params.id}`);
      setProduct(data.product)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getProduct();
  },[])

  const conformOrder =async()=> {
    try {
      const {data} = await axios.post('/api/v1/order/createone', {cart: product?._id, id: auth?.user?._id, price: product?.price });
      if(data.success){
        setIsModalOpen(true);
        setTimeout(() => {
          handleCancel();
        }, 5000);
      }else{
        toast.warn(data.message)
      }
    } catch (error) {
      toast.error("Internal Server Error")
    }
  }

  const login = () => {
    navigate('/login', {state: loacation.pathname})
  }
  const register = () => {
    navigate('/register', {state: loacation.pathname})
  }
  const editProfile = () => {
    navigate('/dashbord/profile', {state: loacation.pathname})
  }
  const handleCancel = ()=> {
    setIsModalOpen(false)
    navigate('/dashbord/order')
  }



  return (
    <>
    <SeoHelmet title="💸(COD) Order Product" description="Cash on Delivery,' a hassle-free way to complete your purchase. With this method, you can finalize your order by paying in cash upon the delivery of your chosen items. Enjoy the flexibility and peace of mind knowing that you can inspect your products before making the payment. It's a simple, reliable way to shop, ensuring your satisfaction every step of the way. Select 'Cash on Delivery' at checkout and indulge in a seamless shopping experience, where convenience meets trust."/>
    {auth?.user ? <>
        <div className='payment-buy'>
        <Collapse accordion={true} expandIconPosition='right' activeKey={[showkay]} size='small' >
            <Collapse.Panel className='payment-collapse' key={"1"} header={<div className='payment-collapse-header'><div className='payment-collapse-number'>1</div> LOGIN</div>}>
                <div>login success </div>
            </Collapse.Panel>

            <Collapse.Panel className='payment-collapse' key={"2"} header={<div className='payment-collapse-header'><div className='payment-collapse-number'>2</div>DELIVERY ADDRESS</div>}>
            <div className='payment-collapse-auth'>
              <div>
                <div><FaUser/> {auth?.user?.name}</div>
                <div><FaPhoneAlt/> {auth?.user?.phone}</div>
                <div><FaHome/> {auth?.user?.address}</div>
              </div>
              <div onClick={editProfile} className='payment-collapse-change'>Edit</div>
            </div>
                <button onClick={()=> setShowkey(3)} className='payment-collapse-order-button'>DELIVER HERE</button>
            </Collapse.Panel>
            <Collapse.Panel className='payment-collapse' key={"3"} header={<div className='payment-collapse-header'> <div className='payment-collapse-number'>3</div>ORDER SUMMERY</div>}>
            <div className='payment-collapse-product-card'>
                <img className='payment-collapse-product-image' src={product.image} alt={product?.title?.slice(0, 8)} />
                <div className='payment-collapse-product-title'>
                    <div>{product?.title?.slice(0, 20)}</div>
                    <div className='payment-collapse-product-price'><strong>Price:- </strong>₹{product.price}</div>
                    <button onClick={()=> setShowkey(4)} className='payment-collapse-order-button'>CONTINUE</button>
                </div>
            </div>
            </Collapse.Panel>
            
            <Collapse.Panel className='payment-collapse' key={"4"} header={<div className='payment-collapse-header'><div className='payment-collapse-number'>4</div>PAYMENT OPTION</div>}>
                <img className='payment-collapse-cod' src="https://i.postimg.cc/br9ntbrT/cod.png" alt="" />
                <button onClick={conformOrder} style={{float: "right"}} className='payment-collapse-order-button'>CONFORM ORDER</button>
            </Collapse.Panel>
        </Collapse>
        <div className='payment-buy-right'>
            <div className='payment-buy-price-heading'>Payment-details</div>
            <div className='payment-buy-line'/>
            <div className='payment-buy-item'>
                <div>Price( 1 item )</div>
                <div>{product.price}</div>
            </div>
            <div className='payment-buy-item'>
                <div>Delivery Charges</div>
                <div className='payment-buy-delivery-free'>FREE</div>
            </div>
            <div className='payment-buy-line'/>
            <div className='payment-buy-item-total-price'>
                <div>Total Payable:- </div>
                <div>₹{product.price}</div>
            </div>
        </div>
        </div>
        </> : <>
          <div className='user-routes'>
            <div className='user-routes-card'>
              <div className='user-routes-text'>I have an account</div>
              <div className='user-routes-button' onClick={login} >Login</div>

              <div className='user-routes-text'>I don't have an account</div>
              <div className='user-routes-button' onClick={register}>Create</div>
            </div>
          </div>
        </>}

        <Modal className='model-container' open={isModalOpen} maskClosable={false} footer={null} onCancel={handleCancel}>
          <div className='model-order-placed'>
            <div className='model-order-placed-coungration'>Coungraculation</div>
            <div className='model-order-placed-image-main'>
              <img className='model-order-placed-image' src={Coungraculation} alt="" />
            </div>
            <div className='model-order-placed-text'>YOUR ORDER HAS BEEN CONFORMED</div>
            <div className='model-order-placed-thanks'>THANKS</div>
          </div>
        </Modal>
    </>
  )
}

export default PaymentBuy
