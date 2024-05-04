import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import StaffAttendanceSheet from '../../../components/AdminComponents/Staffs/StaffAttendanceSheet'
import Footer from '../../../components/AdminComponents/Footer/Footer'


const StaffAttendance = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
         <Header headers="STAFF ATTENDENCE SHEET"/>
    <StaffAttendanceSheet/>
    <Footer/>
    </div>
  )
}

export default StaffAttendance



