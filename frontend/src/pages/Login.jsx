import React, { useState } from 'react'
import "../style/Login.css"
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/auth';

const Login = () => {
  
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const[ email, setEmail ] = useState("");
    const[ password, setPassword ] = useState("");

    const handleLogin = async(e) => {
      e.preventDefault()
      try {
        const {data} = await axios.post('http://localhost:8000/api/v1/auth/login' ,{email, password})
        if(data.success){
          setAuth({ ...auth, user: data?.user, token: data?.token, })
          localStorage.setItem('auth', JSON.stringify(data))
          toast.success(data.message)
          navigate('/')
        }else{
          toast.warn(data.message)
        }
      } catch (error) {
          toast.error("Internal Server Error")
      }
    }

  return (
    <div className='login-form-body'>
      <form className='login-form' onSubmit={handleLogin}>
        <h1 className='login-form-heading'>Login Page</h1>
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
            <div className='login-form-icon'><FaLock/></div>
            <input type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder='Enter Your Password'
            className='login-form-input'
            />
        </div>
        <Link to="/forgot-password" className='login-form-link'>Forgot Password ?</Link>
        <button type='submit' className='login-form-submit'>Login</button>
        <div className='login-form-benidit'>I don't have an account <Link className='login-form-link' to='/register'>Create</Link></div>
      </form>
    </div>
  )
}

export default Login
