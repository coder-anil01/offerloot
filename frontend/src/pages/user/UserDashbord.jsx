import React from 'react'
import { useAuth } from '../../context/auth'
import UserMenu from './UserMenu';

const UserDashbord = () => {
    const[auth] = useAuth();
  return (
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
  )
}

export default UserDashbord
