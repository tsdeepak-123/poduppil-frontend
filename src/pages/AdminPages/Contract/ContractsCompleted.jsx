import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header";
import Footer from "../../../components/AdminComponents/Footer/Footer";
import CompletedContracts from '../../../components/AdminComponents/Contract/CompletedContracts';

function ContractsCompleted() {
  return (
    <div>
   <Header headers="COMPLETED CONTRACTS"/>
   <CompletedContracts/>
   <div className='mt-72'>
   <Footer/>
   </div>
 
    </div>
  )
}

export default ContractsCompleted