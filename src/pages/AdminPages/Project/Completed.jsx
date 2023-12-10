import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header";
import Footer from "../../../components/AdminComponents/Footer/Footer";
import CompletedProjects from '../../../components/AdminComponents/Project/CompletedProjects';

function Completed() {
  return (
    <div>
        <Header headers='COMPLETED PROJECTS'/>
        <CompletedProjects/>
        <div className='mt-80'>
        <Footer/>
        </div>
        
    </div>
  )
}

export default Completed