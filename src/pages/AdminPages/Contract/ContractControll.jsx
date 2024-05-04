import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header"
import Contract from '../../../components/AdminComponents/Contract/Contract'
import Footer from '../../../components/AdminComponents/Footer/Footer'
function ContractControll() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
       <Header headers="CONTRACT WORKS MANAGEMENT"/>
      <Contract/>
      <Footer/>
      </div>
  )
}

export default ContractControll
