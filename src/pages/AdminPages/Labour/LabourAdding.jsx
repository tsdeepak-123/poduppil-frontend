import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import AddLabour from '../../../components/AdminComponents/Labour/AddLabour'

function LabourAdding() {
  return (
    <div >
    
      <Header headers="ADD NEW LABOUR"/>
      <AddLabour/>
      <div className='mb-6'>
  
      </div>
      <Footer/>
    </div>
  )
}

export default LabourAdding
