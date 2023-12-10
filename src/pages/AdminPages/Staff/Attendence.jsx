import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import AttendanceSingle from '../../../components/AdminComponents/Staffs/AttendanceSingle'

function Attendence() {
  return (
    <div>
        <Header headers="STAFF ATTENDENCE"/>
        <AttendanceSingle/>
        <div className='mt-20'> 
        <Footer/>
        </div>
        
    </div>
  )
}

export default Attendence