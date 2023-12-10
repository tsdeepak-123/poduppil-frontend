import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import AddContract from '../../../components/AdminComponents/Contract/AddContract'
import Footer from '../../../components/AdminComponents/Footer/Footer'

function ContractAdding() {
  return (
    <div>
      <Header headers="ADD CONTRACT DETAILS"/>
      <AddContract/>
      <div className='mb-24'></div>
      <Footer/>
    </div>
  )
}

export default ContractAdding
