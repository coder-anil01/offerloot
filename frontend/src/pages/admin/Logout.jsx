import React from 'react'
import AdminMenu from './AdminMenu'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

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
      <div className='dashbord-menu'><AdminMenu/></div>
      <div className='dashbord-content'>
      <div className='logout-btn' onClick={handleLogout}>Logout</div>
      </div>
    </div>
  )
}

export default Logout
