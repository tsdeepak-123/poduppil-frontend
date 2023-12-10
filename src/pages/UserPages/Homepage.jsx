import React from 'react'
// import Footer from '../../components/AdminComponents/Footer/Footer'
import Header from '../../components/UserComponents/Header/Header'
import Profile from '../../components/UserComponents/Profile/Profile'
import Services from '../../components/UserComponents/Services/Services'
import About from '../../components/UserComponents/About/About'
import Projects from '../../components/UserComponents/Projects/Projects'
import Feedback from '../../components/UserComponents/Feedback/Feedback'
import Contact from '../../components/UserComponents/ContactUs/Contact'
import Footer from '../../components/UserComponents/Footer/Footer'
import Interior from '../../components/UserComponents/Interior/Interior'

function Homepage() {
  return (
    <div className='overflow-x-hidden'>
      <Header/>
      <Profile/>
      <About/>
      <Services/>
      <Projects/>
      <Interior/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Homepage
