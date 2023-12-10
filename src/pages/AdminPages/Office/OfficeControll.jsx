import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header"
import Office from '../../../components/AdminComponents/Office/Office'
import Footer from '../../../components/AdminComponents/Footer/Footer'

function OfficeControll() {
  return (
    <div>
       <Header headers="OFFICE MANAGEMENT"/>
      <Office/>
      <div className='mt-14'> 
      <Footer/>
      </div>
      
    </div>
  )
}

export default OfficeControll
