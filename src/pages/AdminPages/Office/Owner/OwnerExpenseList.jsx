import React from 'react'
import Header from '../../../../components/AdminComponents/Header/Header'
import OwnerExpense from '../../../../components/AdminComponents/Office/Owner/OwnerExpense'


function OwnerExpenseList() {
  return (
    <div>
<Header headers={'OWNER EXPENSE LIST'}/>
<OwnerExpense/>
    </div>
  )
}

export default OwnerExpenseList