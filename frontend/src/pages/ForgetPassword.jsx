import React, { useState } from 'react'
import "../style/Login.css"
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgetPassword = () => {

    const navigate = useNavigate();
    const[ email, setEmail ] = useState("");
    const[ password, setPassword ] = useState("");
    const[ answer, setAnswer ] = useState("");

    const handleForgot = async(e) => {
      e.preventDefault()
      try {
        const {data} = await axios.post('http://localhost:8000/api/v1/auth/forgot-password' ,{email, answer, newPassword: password})
        if(data.success){
          navigate('/login')
          toast.success(data.message)
        }else{
          toast.warn(data.message)
        }
      } catch (error) {
          toast.error("Internal Server Error")
      }
    }

  return (
    <div>
      <div className='login-form-body'>
      <form className='login-form' onSubmit={handleForgot}>
        <h1 className='login-form-heading'>Forget Password</h1>
        <div className='login-form-items'>
            <div className='login-form-icon'><MdEmail/></div>
            <input type="text"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            placeholder='Enter Your Email'
            className='login-form-input'
            />
        </div>
        
        <div className='login-form-items'>
            <div className='login-form-icon'><GiBrain/></div>
            <input type="text"
            value={answer}
            onChange={(e)=> setAnswer(e.target.value)}
            placeholder='Enter Your Password Hint'
            className='login-form-input'
            />
        </div>

        <div className='login-form-items'>
            <div className='login-form-icon'><FaLock/></div>
            <input type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder='Enter New Password'
            className='login-form-input'
            />
        </div>

        <button type='submit' className='login-form-submit'>Reset</button>
        <Link className='login-form-link' to='/register'>login</Link>
      </form>
    </div>
    </div>
  )
}

export default ForgetPassword
