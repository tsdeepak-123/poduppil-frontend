import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import AddBill from '../../../components/AdminComponents/Office/AddBill'
import Footer from '../../../components/AdminComponents/Footer/Footer'

function Addbills() {
  return (
    <div className='overflow-hidden'>
        <Header headers="ADD YOUR BILLS"/>
      <AddBill/>
      <div className='mb-24'></div>
      <Footer/>
    </div>
  )
}

export default Addbills
