import React from 'react'
import Header from '../../../../components/AdminComponents/Header/Header'
import Footer from '../../../../components/AdminComponents/Footer/Footer'
import OwnerExpense from '../../../../components/AdminComponents/Office/Owner/OwnerExpense'


function OwnerExpenseList() {
  return (
    <div>
<Header headers={'OWNER EXPENSE LIST'}/>
<OwnerExpense/>
<div className='mt-40'></div>
<Footer/>
    </div>
  )
}

export default OwnerExpenseList