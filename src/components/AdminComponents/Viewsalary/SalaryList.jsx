import React from 'react'
import StaffSalaryWeekly from './StaffSalaryWeekly'
import Header from '../Header/Header'
import WeeklySalary from './WeeklySalary'

function SalaryList() {
  return (
    <div>
        <Header headers="SALARY MANAGEMENT"/>
        <WeeklySalary/>
        <StaffSalaryWeekly/>
    </div>
  )
}

export default SalaryList