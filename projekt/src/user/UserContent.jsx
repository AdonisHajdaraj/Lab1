import React from 'react'
import ContentHeader from '../user/UserContentHeader'
import Card from '../user/UserCard'
import '../styles/content.css'
import Klients from '../user/UserKlients'



const Content = () => {
  return   <div className='content'>
      <ContentHeader />
     <Card />
     <Klients />
   
      
  </div>
  
}

export default Content
