import React from 'react'
import AdminMenu from './AdminMenu'

const AllOrders = () => {
  return (
    <div className='dashbord'>
      <div className='dashbord-menu'><AdminMenu/></div>
      <div className='dashbord-content'>
        all orders
      </div>
    </div>
  )
}

export default AllOrders
