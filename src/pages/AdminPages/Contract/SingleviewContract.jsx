import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import SingleViewContract from '../../../components/AdminComponents/Contract/SingleViewContract'

function SingleviewContract() {
  return (
    <div>
      <Header headers="CONTRACT DETAILS"/>
      <SingleViewContract/>
      <div className='mt-28'></div>
      <Footer/>
    </div>
  )
}

export default SingleviewContract
