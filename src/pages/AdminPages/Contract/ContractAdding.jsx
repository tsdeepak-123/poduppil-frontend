import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import AddContract from '../../../components/AdminComponents/Contract/AddContract'
import Footer from '../../../components/AdminComponents/Footer/Footer'

function ContractAdding() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header headers="ADD CONTRACT DETAILS"/>
      <AddContract/>
      <Footer/>
    </div>
  )
}

export default ContractAdding
