import React from 'react'
import { useAuth } from '../../context/auth'
import UserMenu from './UserMenu';
import SeoHelmet from '../../components/SeoHelmet';

const UserDashbord = () => {
    const[auth] = useAuth();
  return (
    <>
    <SeoHelmet title="My Dashbord" description="the user dashboard designed exclusively for you. Here, your shopping journey takes center stage. Track orders, manage your wishlist, explore personalized recommendations, and effortlessly revisit your browsing history—all from a single, intuitive interface. Your dashboard isn't just a tool; it's your shopping companion. Stay updated on promotions, manage your payment methods, and even engage with customer support—all tailored to enhance your shopping experience"/>
    <div className='dashbord'>
      <div className='dashbord-menu'><UserMenu/></div>
      <div className='dashbord-content'>
      <div className='nav-cart-product'>
          <h3><strong>Name:- </strong>{auth?.user?.name}</h3>
          <h3><strong>Email:- </strong>{auth?.user?.email}</h3>
          <h3><strong>Phone:- </strong>{auth?.user?.phone}</h3>
          <h3><strong>Address:- </strong>{auth?.user?.address}</h3>
        </div>
      </div>
    </div>
    </>
  )
}

export default UserDashbord
