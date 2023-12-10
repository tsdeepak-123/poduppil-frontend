import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import SalaryHistory from '../../../components/AdminComponents/Viewsalary/SalaryHistory'

function SalaryHistoryDisplay() {
  return (
    <div>
<Header headers='SALARY HISTORY'/>
<SalaryHistory/>
<div className='mt-60'>
<Footer/>
</div>

    </div>
  )
}

export default SalaryHistoryDisplay