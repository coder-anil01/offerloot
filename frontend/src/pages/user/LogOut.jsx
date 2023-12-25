import React from 'react'
import UserMenu from './UserMenu'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const[auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = async()=>{
    try {
      setAuth({ ...auth, user: null, token: "", })
        await localStorage.removeItem('auth')
        toast.success("Logout Successfully")
        navigate('/login')
    } catch (error) {
      toast.error("Internal server Error")
    }
  }
  return (
    <div className='dashbord'>
      <div className='dashbord-menu'><UserMenu/></div>
      <div className='dashbord-content'>
      <div className='logout-btn' onClick={handleLogout}>Logout</div>
      </div>
    </div>
  )
}

export default LogOut
