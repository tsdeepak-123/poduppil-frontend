import React from 'react'
import AttendanceSheet from '../../../components/AdminComponents/Labour/AttendanceSheet'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'

const LabourAttendance = () => {
  return (
    <div>
       <Header headers="LABOUR ATTENDENCE SHEET"/>
    <AttendanceSheet/>
    <div className='mt-32'>
    <Footer/>
    </div>
     
    </div>
  )
}

export default LabourAttendance