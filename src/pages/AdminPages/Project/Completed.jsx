import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header";
import Footer from "../../../components/AdminComponents/Footer/Footer";
import CompletedProjects from '../../../components/AdminComponents/Project/CompletedProjects';

function Completed() {
  return (
    <div>
        <Header headers='COMPLETED PROJECTS'/>
        <CompletedProjects/>
        <Footer/>     
    </div>
  )
}

export default Completed