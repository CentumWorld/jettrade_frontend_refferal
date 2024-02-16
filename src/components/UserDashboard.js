import React,{useEffect} from 'react'
import { Outlet,useNavigate } from 'react-router-dom'
import '../css/UserDashboard.css'
import UserSidebar from './UserSidebar';

function UserDashboard() {

  const navigate = useNavigate();
  useEffect(() => {
     navigate('/userdashboard/dashboard')
  }
  ,[])
  
  return (
    <>
  
      <div className='main_container'>
        <div className='user_sideBar'>
          <UserSidebar/>
        </div>
        <div className='user_content_container'>
            <Outlet/>
        </div>
      </div>
    </>
    
    
  )
}

export default UserDashboard