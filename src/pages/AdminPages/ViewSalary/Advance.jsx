import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import AdvanceHistory from '../../../components/AdminComponents/Viewsalary/AdvanceHistory'

function Advance() {
  return (
    <div>
        <Header headers={"ADVANCE HISTORY"}/>
        <AdvanceHistory/>
        <div className='mb-48'></div>
        <Footer/>
    </div>
  )
}

export default Advance