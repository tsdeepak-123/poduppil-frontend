import React from 'react'
import RecivedCash from '../../../components/AdminComponents/Project/RecivedCash'
import Header from "../../../components/AdminComponents/Header/Header"
import Footer from "../../../components/AdminComponents/Footer/Footer"
function RecievedCashes() {
  return (
    <div>
        <Header headers="RECIEVED AMOUNTS OF PROJECT"/>
        <RecivedCash/>
        <div className='mt-64'>
        <Footer/>
        </div>
        
    </div>
  )
}

export default RecievedCashes