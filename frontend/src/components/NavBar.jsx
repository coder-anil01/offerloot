import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import Navlogo from '../image/navlogo.png'
import { IoMdCart } from "react-icons/io";
import { FaUser, FaRegHeart } from "react-icons/fa";
import { useAuth } from '../context/auth';


const NavBar = () => {

  const[ auth ] = useAuth();

  return (
    <>
    <div className='navbar'>
      <Link to="/" className='navbar-logo-link'><img className='navbarlogo' src={Navlogo} alt="" /></Link>
      <div className='navbar-items'>
        <NavLink><IoMdCart/></NavLink>
        <NavLink><FaRegHeart/></NavLink>
        
        <NavLink to={`/${auth?.user?.role === 8987 ? "admin" : "dashbord"}`}><FaUser/></NavLink>
      </div>
    </div>
    <div className='navbar-bottom-space'></div>
    </>

  )
}

export default NavBar
