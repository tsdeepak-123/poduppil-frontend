import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import SalaryHistory from '../../../components/AdminComponents/Viewsalary/SalaryHistory'

function SalaryHistoryDisplay() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
<Header headers='SALARY HISTORY'/>
<SalaryHistory/>
<Footer/>
</div>

  )
}

export default SalaryHistoryDisplay