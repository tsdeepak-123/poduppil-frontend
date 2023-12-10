import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import UtilityBills from '../../../components/AdminComponents/Office/UtilityBills'
import Footer from '../../../components/AdminComponents/Footer/Footer'

const UtilityBill = () => {
  return (
    <div>
     <Header headers="OFFICE UTILITY BILLS"/>
     <UtilityBills/>
     <div className='mt-60'>
      <Footer/>
     </div>
    </div>
  )
}

export default UtilityBill



