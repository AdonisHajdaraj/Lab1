import React from 'react'
import ContentHeader from '../admin/ContentHeader'
import Card from '../admin/Card'
import '../styles/content.css'
import Klients from '../admin/Klients'


const Content = () => {
  return   <div className='content'>
      <ContentHeader />
     <Card />
     <Klients />
      
  </div>
  
}

export default Content
