import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import Profile from '../../../components/AdminComponents/Staffs/Profile'
function StaffProfile() {
  return (
    <div>
        <Header headers='STAFF PROFILE'/>
        <Profile/>
        <Footer/>
    </div>
  )
}

export default StaffProfile