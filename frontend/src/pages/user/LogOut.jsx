import React from 'react'
import UserMenu from './UserMenu'

const LogOut = () => {
  return (
    <div className='dashbord'>
      <div className='dashbord-menu'><UserMenu/></div>
      <div className='dashbord-content'>
      Logout
      </div>
    </div>
  )
}

export default LogOut
