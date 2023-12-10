import React from 'react'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import Header from '../../../components/AdminComponents/Header/Header'
import StaffSalaryWeekly from '../../../components/AdminComponents/Viewsalary/StaffSalaryWeekly'

function StaffWeekSalary() {
  return (
    <div>
        <Header headers="STAFF SALARY (WEEKLY)"/>
        <StaffSalaryWeekly/>
        <div className='mt-80'>
        <Footer/>
        </div>
       
    </div>
  )
}

export default StaffWeekSalary