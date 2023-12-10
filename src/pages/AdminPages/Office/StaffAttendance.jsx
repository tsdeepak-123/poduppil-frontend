import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import StaffAttendanceSheet from '../../../components/AdminComponents/Staffs/StaffAttendanceSheet'
import Footer from '../../../components/AdminComponents/Footer/Footer'


const StaffAttendance = () => {
  return (
    <div>
         <Header headers="STAFF ATTENDENCE SHEET"/>
    <StaffAttendanceSheet/>
    <div className='mt-56'>
    <Footer/>
    </div>
    
    </div>
  )
}

export default StaffAttendance



