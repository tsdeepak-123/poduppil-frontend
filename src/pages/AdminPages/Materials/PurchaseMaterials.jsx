import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import PurchasePage from '../../../components/AdminComponents/Materials/PurchasePage'
import Footer from '../../../components/AdminComponents/Footer/Footer'

function PurchaseMaterials() {
  return (
    <div>
        <Header headers={"PURCHASE MATERIAL"}/>
        <PurchasePage/>
    </div>
  )
}

export default PurchaseMaterials