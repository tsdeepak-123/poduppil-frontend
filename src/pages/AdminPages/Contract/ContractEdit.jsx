import React from 'react'
import EditContract from '../../../components/AdminComponents/Contract/EditContract'

import Header from '../../../components/AdminComponents/Header/Header'

import Footer from '../../../components/AdminComponents/Footer/Footer'
const ContractEdit = () => {
  return (
    
     <div className="flex flex-col justify-between min-h-screen">
     <Header headers="EDIT CONTRACT DETAILS"/>
     <EditContract/>
     <Footer/>
   </div>
  )
}

export default ContractEdit