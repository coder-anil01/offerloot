import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import { FaLock, FaUser,FaPhoneAlt, FaShippingFast } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GiBrain } from "react-icons/gi";
import { toast } from 'react-toastify';
import { GiPostOffice } from "react-icons/gi";


const Register = () => {

    const[ name, setName ] = useState("");
    const[ email, setEmail ] = useState("");
    const[ password, setPassword ] = useState("");
    const[ phone, setPhone ] = useState("");
    const[ answer, setAnswer ] = useState("");
    const[ address, setAddress ] = useState("");
    const[ pin, setPin ] = useState("");

    const handleRegister = async(e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('http://localhost:8000/api/v1/auth/register', {name, email, password, phone, answer,address, pin})
            if(data.success){
                toast.success(data.message)
            }else{
                toast.warn(data.message)
            }
        } catch (error) {
            toast.error("Internal Server Error")
        }
    }

  return (
    <div className='login-form-body'>
      <form className='login-form' onSubmit={handleRegister}>
      <h1 className='login-form-heading'>Create Account</h1>
        <div className='login-form-items'>
            <div className='login-form-icon'><FaUser/></div>
            <input type="text"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            placeholder='Enter Your Name'
            className='login-form-input'
            required
            />
        </div>
        <div className='login-form-items'>
            <div className='login-form-icon'><MdEmail/></div>
            <input type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            placeholder='Enter Your Email'
            className='login-form-input'
            required
            />
        </div>
        
        <div className='login-form-items'>
            <div className='login-form-icon'><FaLock/></div>
            <input type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder='Enter New Password'
            className='login-form-input'
            required
            />
        </div>

        <div className='login-form-items'>
            <div className='login-form-icon'><FaPhoneAlt/></div>
            <input type="Number"
            value={phone}
            onChange={(e)=> setPhone(e.target.value)}
            placeholder='Enter Mobile Number'
            className='login-form-input'
            required
            />
        </div>

        <div className='login-form-items'>
            <div className='login-form-icon'><GiBrain/></div>
            <input type="text"
            value={answer}
            onChange={(e)=> setAnswer(e.target.value)}
            placeholder='Enter Password Hint'
            className='login-form-input'
            required
            />
        </div>
        
        <div className='login-form-items'>
            <div className='login-form-icon'><FaShippingFast/></div>
            <input type="text"
            value={address}
            onChange={(e)=> setAddress(e.target.value)}
            placeholder='Enter Delivery Address'
            className='login-form-input'
            required
            />
        </div>
        
        <div className='login-form-items'>
            <div className='login-form-icon'><GiPostOffice/></div>
            <input type="Number"
            value={pin}
            onChange={(e)=> setPin(e.target.value)}
            placeholder='Delivery Pin Code'
            className='login-form-input'
            required
            />
        </div>
        
        <button type='submit' className='login-form-submit'>Register</button>
        <div className='login-form-benidit'>I have an account <Link className='login-form-link' to='/login'>Login</Link></div>
      </form>
    </div>
  )
}

export default Register
