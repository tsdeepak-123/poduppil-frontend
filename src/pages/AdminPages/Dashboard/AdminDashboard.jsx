import React from 'react'
import Dashboard from '../../../components/AdminComponents/Dashborad/Dashboard'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import Header from '../../../components/AdminComponents/Header/Header'

function AdminDashboard() {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <Header headers="DASHBOARD"/>
      <div></div>
        <Dashboard/>  
        <Footer />
    </div>
  )
}

export default AdminDashboard
