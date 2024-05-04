import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header";
import Footer from "../../../components/AdminComponents/Footer/Footer";
import CompletedContracts from '../../../components/AdminComponents/Contract/CompletedContracts';

function ContractsCompleted() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
   <Header headers="COMPLETED CONTRACTS"/>
   <CompletedContracts/>
   <Footer/>
   </div>
  )
}

export default ContractsCompleted