import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header"
import StaffDisplay from '../../../components/AdminComponents/Staffs/StaffDisplay'
import Footer from '../../../components/AdminComponents/Footer/Footer'

function StaffControll() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header headers="STAFF MANAGEMENT"/>
      <StaffDisplay/>
      <Footer/>
    </div>
  )
}

export default StaffControll
