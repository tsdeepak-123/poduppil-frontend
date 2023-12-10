import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import SalaryList from '../../../components/AdminComponents/Viewsalary/SalaryList'
import Footer from '../../../components/AdminComponents/Footer/Footer'


function SalaryManagement() {
  return (
    <div>
        <Header/>
        <SalaryList/>
        <div className='mt-14'>
        <Footer/>
        </div>
        
    </div>
  )
}

export default SalaryManagement