import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import AddBill from '../../../components/AdminComponents/Office/AddBill'
import Footer from '../../../components/AdminComponents/Footer/Footer'

function Addbills() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
        <Header headers="ADD YOUR BILLS"/>
      <AddBill/>
      <Footer/>
    </div>
  )
}

export default Addbills
