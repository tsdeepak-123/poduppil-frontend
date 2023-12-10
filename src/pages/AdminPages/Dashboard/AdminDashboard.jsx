import React from 'react'
import Dashboard from '../../../components/AdminComponents/Dashborad/Dashboard'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import Header from '../../../components/AdminComponents/Header/Header'

function AdminDashboard() {
  return (
    <div >
      <Header headers="DASHBOARD"/>
        <Dashboard/>
        <div className='mt-8'>
        <Footer/>
        </div>
     
      
    </div>
  )
}

export default AdminDashboard
