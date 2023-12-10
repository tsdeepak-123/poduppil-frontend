import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import StaffSalarys from'../../../components/AdminComponents/Viewsalary/StaffSalary'


function StaffSalary() {
  return (
    <div>
        <Header headers='STAFF SALARY DETAILS'/>
        <StaffSalarys/>
        <Footer/>
    </div>
  )
}

export default StaffSalary