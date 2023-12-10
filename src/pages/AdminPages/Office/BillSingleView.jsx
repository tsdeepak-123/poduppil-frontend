import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import BillSingle from '../../../components/AdminComponents/Office/BillSingle'

function BillSingleView() {
  return (
    <div>
        <Header headers="Bill Details"/> 
        <BillSingle/>
        <div className='mt-14'>
        <Footer/>
        </div>
        
    </div>
  )
}

export default BillSingleView