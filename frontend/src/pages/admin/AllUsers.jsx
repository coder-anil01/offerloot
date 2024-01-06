import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios';
import { Button, Modal } from 'antd';
import { toast } from 'react-toastify';
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt,FaUser,  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SeoHelmet from '../../components/SeoHelmet';

const AllUsers = () => {

  const [users, setUsers] = useState([]);
  const[total, setTotal] = useState("");
  const[id, setId] = useState("");
  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getAllUsers = async() => {
    try {
      const {data} = await axios.get('/api/v1/auth/get-allusers')
        setUsers(data.allUsers);
        setTotal(data.counTotal)
    } catch (error) {
      console.log(error)
    }
  }
useEffect(()=>{
  getAllUsers();
},[])

const deleteUser = async()=>{
  try {
    const {data} = await axios.delete(`/api/v1/auth/admin-delete/${id}`)
    setIsModalOpen(false);
    getAllUsers();
  } catch (error) {
    toast.error("Internal Server Error")
  }
}

  return (
    <>
    <SeoHelmet title={`(${total} ) Users Registered`} description='The "Admin All Users" section within an eCommerce platform provides administrators or store owners with a comprehensive view and management interface for all user accounts accessing the system. This area allows administrators to oversee, manage, and maintain user profiles, ensuring smooth operations and access control within the eCommerce environment'/>
    {/* <SeoHelmet title="" description=""/> */}
    <div className='dashbord'>
      <div className='dashbord-menu'><AdminMenu/></div>
      <div className=''>
        <div className='dashbord-menu-total'>All Users:- {total}</div>
        <div className='dashbord-menu-box'>
          {users?.map((u)=>(
            <div className='dashbord-menu-box-card'>
              <div><FaUser/> {u.name}</div>
              <div><IoIosMail/> {u.email}</div>
              <div><FaPhoneAlt/> {u.phone}</div>
              <div className='dashbord-menu-box-card-delete' onClick={()=> {showModal(); setId(u._id); setName(u.name); setEmail(u.email)}} ><MdDelete/></div>
            </div>
          ))}
        </div>
        <Modal title="Delete User" open={isModalOpen} onOk={deleteUser} onCancel={handleCancel}>
        <h3>If you want to delete then click on "Ok"</h3>
        <p><strong>Name:- </strong>{name}</p>
        <p><strong>Email:- </strong>{email}</p>
      </Modal>
      </div>
    </div>
    </>
  )
}

export default AllUsers
