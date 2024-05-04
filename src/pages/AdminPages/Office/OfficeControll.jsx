import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header"
import Office from '../../../components/AdminComponents/Office/Office'

function OfficeControll() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
       <Header headers="OFFICE MANAGEMENT"/>
      <Office/>
    </div>
  )
}

export default OfficeControll
