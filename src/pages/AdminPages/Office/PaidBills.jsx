import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import BillsPaid from '../../../components/AdminComponents/Office/BillsPaid'
function PaidBills() {
  return (
    <div>
<Header headers="PAID BILL DETAILS"/>
<BillsPaid/>
{/* <Footer/> */}

    </div>
  )
}

export default PaidBills