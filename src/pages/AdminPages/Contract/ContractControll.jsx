import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header"
import Contract from '../../../components/AdminComponents/Contract/Contract'
import Footer from '../../../components/AdminComponents/Footer/Footer'
function ContractControll() {
  return (
    <div>
       <Header headers="CONTRACT WORKS MANAGEMENT"/>
      <Contract/>
      <div className='mt-56'>
      <Footer/>
      </div>
     
    </div>
  )
}

export default ContractControll
