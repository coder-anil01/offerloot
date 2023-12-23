import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import Navlogo from '../image/navlogo.png'
import { IoMdCart } from "react-icons/io";
import { FaUser, FaRegHeart } from "react-icons/fa";


const NavBar = () => {
  return (
    <>
    <div className='navbar'>
      <Link to="/" className='navbar-logo-link'><img className='navbarlogo' src={Navlogo} alt="" /></Link>
      <div className='navbar-items'>
        <NavLink><IoMdCart/></NavLink>
        <NavLink><FaRegHeart/></NavLink>
        <NavLink><FaUser/></NavLink>
      </div>
    </div>
    <div className='navbar-bottom-space'></div>
    </>

  )
}

export default NavBar
