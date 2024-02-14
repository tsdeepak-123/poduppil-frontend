import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header"
import CareOfPayment from "../../../components/AdminComponents/Materials/CareOfPayment"

function CareOfPayments() {
  return (
    <div>
        <Header headers={"PAYMENT DETAILS"}/>
        <CareOfPayment/>
    </div>
  )
}

export default CareOfPayments