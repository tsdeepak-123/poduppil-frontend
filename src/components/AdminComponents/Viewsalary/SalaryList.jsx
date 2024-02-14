import React from 'react'
import StaffSalaryWeekly from './StaffSalaryWeekly'
import Header from '../Header/Header'
import WeeklySalary from './WeeklySalary'
import Footer from "../../AdminComponents/Footer/Footer"

function SalaryList() {
  return (
    <div>
        <Header headers="SALARY MANAGEMENT"/>
        <div className='flex flex-col justify-between min-h-screen'>
        <WeeklySalary/>
        <StaffSalaryWeekly/>
        <div className='mt-8'>
        <Footer/>
        </div>
        </div>
    </div>
  )
}

export default SalaryList