import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import PurchaseMaterial from '../../../components/AdminComponents/Materials/PurchaseMaterial'


function Purchase() {
  return (
    <div>
<Header headers="MATERIAL PURCHASE"/>
<PurchaseMaterial/>
<div className='mt-72'>
<Footer/>
</div>

    </div>
  )
}

export default Purchase