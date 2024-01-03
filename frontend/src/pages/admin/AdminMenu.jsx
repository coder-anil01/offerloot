import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaEdit,FaProductHunt, FaUsers, FaCar, FaUser } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { GrUserAdmin } from "react-icons/gr";
import { MdDashboard, MdOutlineCategory } from "react-icons/md";


const AdminMenu = () => {
  return (
    <div className='menu'>
      <NavLink to="/admin" className="menu-button"><div className='menu-icon'><MdDashboard /></div> Dashbord</NavLink>
      <NavLink to="/admin/profile" className="menu-button"><div className='menu-icon'><FaEdit /></div> Edit Account</NavLink>
      <NavLink to="/admin/order" className="menu-button"><div className='menu-icon'><FaCar /></div> My Order</NavLink>
      <NavLink to="/admin/users" className="menu-button"><div className='menu-icon'><FaUsers /></div> All Users</NavLink>
      <NavLink to="/admin/admins" className="menu-button"><div className='menu-icon'><GrUserAdmin /></div> All Admins</NavLink>
      <NavLink to="/admin/categories" className="menu-button"><div className='menu-icon'><MdOutlineCategory /></div> Categories</NavLink>
      <NavLink to="/admin/products" className="menu-button"><div className='menu-icon'><FaProductHunt /></div> Products</NavLink>
      <NavLink to="/admin/logout" className="menu-button"><div className='menu-icon'><ImExit /></div> Logout</NavLink>
    </div>
  )
}

export default AdminMenu
