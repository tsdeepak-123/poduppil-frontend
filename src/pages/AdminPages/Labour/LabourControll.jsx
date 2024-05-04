import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header"
import Labour from '../../../components/AdminComponents/Labour/Labour'
import Footer from '../../../components/AdminComponents/Footer/Footer'

function LabourControll() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header headers="LABOUR MANAGEMENT"/>
      <Labour/>
      <Footer/>
      </div> 
  )
}

export default LabourControll
