import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth';


const AdminRoutes = () => {

    const [auth, setAuth] = useAuth();
    const [admin, setAdmin] = useState(false);

    const authCheck = async() => {
        try {
            const {data} = await axios.post('http://localhost:8000/api/v1/auth/admin-auth', {id: auth?.user?._id})
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(auth?.user?.role === 8987 )authCheck()
    },[auth])
  return (
    <>
      {auth?.token ? <Outlet/> : <>
      <div className='user-routes'>
        <div className='user-routes-card'>
          <div className='user-routes-text'>I have an account</div>
          <Link className='user-routes-button' to='/login'>Login</Link>

          <div className='user-routes-text'>I don't have an account</div>
          <Link className='user-routes-button' to='/register'>Create</Link>
        </div>
      </div>
      </>}
    </>
  )
}

export default AdminRoutes
