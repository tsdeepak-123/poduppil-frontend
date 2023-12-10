import React from 'react'
import EditContract from '../../../components/AdminComponents/Contract/EditContract'

import Header from '../../../components/AdminComponents/Header/Header'

import Footer from '../../../components/AdminComponents/Footer/Footer'
const ContractEdit = () => {
  return (
    
     <div>
     <Header headers="EDIT CONTRACT DETAILS"/>
     <EditContract/>
     <div className='mb-24'></div>
     <Footer/>
   </div>
  )
}

export default ContractEdit