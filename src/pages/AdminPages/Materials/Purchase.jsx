import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import PurchaseMaterial from '../../../components/AdminComponents/Materials/PurchaseMaterial'
import Materials from '../../../components/AdminComponents/Materials/Materials'


function Purchase() {
  return (
    <div>
<Header headers="MATERIAL PURCHASE"/>
<PurchaseMaterial/>
    </div>
  )
}

export default Purchase