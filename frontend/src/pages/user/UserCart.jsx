import React from 'react'
import UserMenu from './UserMenu'
import NavCartPage from '../NavCartPage';

const UserCart = () => {

  return (
    <div className='dashbord'>
      <div className='dashbord-menu'><UserMenu/></div>
      <div className='dashbord-content'>
        <NavCartPage/>
      </div>
    </div>
  )
}

export default UserCart
