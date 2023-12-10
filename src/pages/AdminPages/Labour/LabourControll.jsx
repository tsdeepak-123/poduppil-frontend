import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header"
import Labour from '../../../components/AdminComponents/Labour/Labour'
import Footer from '../../../components/AdminComponents/Footer/Footer'

function LabourControll() {
  return (
    <div className=''>
      <Header headers="LABOUR MANAGEMENT"/>
      <Labour/>
      <div className='mt-56'>
      <Footer/>
      </div> 
    </div>
  )
}

export default LabourControll
