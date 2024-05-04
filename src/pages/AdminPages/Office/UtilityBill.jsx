import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import UtilityBills from '../../../components/AdminComponents/Office/UtilityBills'
import Footer from '../../../components/AdminComponents/Footer/Footer'

const UtilityBill = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
     <Header headers="OFFICE UTILITY BILLS"/>
     <UtilityBills/>
      <Footer/>
    </div>
  )
}

export default UtilityBill



