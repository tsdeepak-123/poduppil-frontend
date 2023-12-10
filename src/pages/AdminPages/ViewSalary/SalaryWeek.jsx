import React from 'react'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import Header from '../../../components/AdminComponents/Header/Header'
import WeeklySalary from '../../../components/AdminComponents/Viewsalary/WeeklySalary'

function SalaryWeek() {
  return (
    <div>
     <Header headers="THIS WEEK SALARY"/>
     <WeeklySalary/>
     <div className='mt-80'>
     <Footer/>   
     </div>
 

    </div>
  )
}

export default SalaryWeek