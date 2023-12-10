import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import UserHome from '../../../components/AdminComponents/UserHome/UserHome'

function UserHomeControll() {
  return (
    <div>
       <Header headers="MANAGE USER HOME"/> 
       <UserHome/>
       <div className='mt-14'>
        <Footer/>
       </div>

    </div>
  )
}

export default UserHomeControll