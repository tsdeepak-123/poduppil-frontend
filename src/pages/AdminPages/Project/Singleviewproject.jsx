import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import SingleViewProject from '../../../components/AdminComponents/Project/SingleViewProject'

function Singleviewproject() {
  return (
    <div>
      <Header headers="PROJECT DETAILS"/>
      <SingleViewProject/>
      <div className='mb-24'></div>
      <Footer/>
    </div>
  )
}

export default Singleviewproject
