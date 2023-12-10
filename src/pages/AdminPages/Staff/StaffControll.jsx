import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header"
import StaffDisplay from '../../../components/AdminComponents/Staffs/StaffDisplay'
import Footer from '../../../components/AdminComponents/Footer/Footer'

function StaffControll() {
  return (
    <div>
      <Header headers="STAFF MANAGEMENT"/>
      <StaffDisplay/>
      <div className='mt-56'>
      <Footer/>
      </div>
    </div>
  )
}

export default StaffControll
