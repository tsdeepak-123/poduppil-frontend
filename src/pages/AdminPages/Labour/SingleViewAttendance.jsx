import React from 'react'
import AttendanceSingleView from '../../../components/AdminComponents/Labour/AttendanceSingleView'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
const SingleViewAttendance = () => {
  
  return (
      <div >
    
      <Header headers="ATTENDANCE"/>
        <AttendanceSingleView/> 
      <div className='mt-20'>
      <Footer/>
      </div>
      
    </div>
  )
}

export default SingleViewAttendance