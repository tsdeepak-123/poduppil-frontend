import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import AdvanceHistory from '../../../components/AdminComponents/Viewsalary/AdvanceHistory'

function Advance() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
        <Header headers={"ADVANCE HISTORY"}/>
        <AdvanceHistory/>
        <Footer/>
    </div>
  )
}

export default Advance