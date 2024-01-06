import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import Navlogo from '../image/navlogo.png'
import { IoMdCart } from "react-icons/io";
import { FaUser, FaRegHeart, FaCartPlus } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { useAuth } from '../context/auth';
import { MdHome } from "react-icons/md";

const NavBar = () => {

  const[ auth ] = useAuth();

  return (
    <>
    <div className='navbar'>
      <Link to="/" className='navbar-logo-link'><img className='navbarlogo' src={Navlogo} alt="" /></Link>
      <div className='navbar-items'>
        <NavLink className="res-icon-nav" to='/'><MdHome/></NavLink>
        <NavLink to='/cart'><IoMdCart/></NavLink>
        <NavLink to='/dashbord/wishlist'><FaRegHeart/></NavLink>
        <NavLink className="res-icon-nav" to='/dashbord/order'><FaShippingFast/></NavLink>
        <NavLink to={`/${auth?.user?.role === 8987 ? "admin" : "dashbord/profile"}`}><FaUser/></NavLink>
      </div>
    </div>
    <div className='navbar-bottom-space'></div>
    </>

  )
}

export default NavBar
