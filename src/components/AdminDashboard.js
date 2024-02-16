import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from './Admin/AdminSideBar/AdminSideBar'
import '../css/AdminDashboard.css'

const AdminDashboard = () => {
  return (
    <>
      <div className='admin-main-container'>
        <div className='admin_sideBar'>
          <AdminSideBar/>
        </div>
        <div className='admin_content_container'>
            <Outlet/>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard