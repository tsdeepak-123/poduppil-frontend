import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import Salary from '../../../components/AdminComponents/Viewsalary/Salary'

function ViewSalary() {
  return (
    
    <div>
      <Header headers='LABOUR SALARY'/>
      <Salary/>
      <Footer/>
    </div>
  )
}

export default ViewSalary
