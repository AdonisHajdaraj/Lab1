import React from 'react'
import Sidebar from '../admin/Sidebar';
import Content from '../admin/Content';
import Profile from '../admin/Profile';


const Dashboard = () => {
    return (
     
     
          
        <div className="dashboard--content">
          <Sidebar />
          <Content />
          <Profile />
        </div>
     
        
     
    )
  }
  
  export default Dashboard