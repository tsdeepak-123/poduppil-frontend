import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import Profile from '../../../components/AdminComponents/Labour/Profile'


function ProfilePage() {
  return (
    <div >
        <Header headers='LABOUR PROFILE'/>
        <Profile/>
        <Footer/>
        
    </div>
  )
}

export default ProfilePage