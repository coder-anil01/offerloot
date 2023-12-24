import React from 'react'
import UserMenu from './UserMenu'

const UserOrder = () => {
  return (
    <div className='dashbord'>
      <div className='dashbord-menu'><UserMenu/></div>
      <div className='dashbord-content'>
      Wishlist
      </div>
    </div>
  )
}

export default UserOrder
