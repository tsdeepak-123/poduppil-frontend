import React from 'react'
import AttendanceSheet from '../../../components/AdminComponents/Labour/AttendanceSheet'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'

const LabourAttendance = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
       <Header headers="LABOUR ATTENDENCE SHEET"/>
    <AttendanceSheet/>
    <Footer/>
     
    </div>
  )
}

export default LabourAttendance