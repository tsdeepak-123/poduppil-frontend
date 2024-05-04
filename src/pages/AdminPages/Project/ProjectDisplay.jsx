import React from 'react'
import Header from '../../../components/AdminComponents/Header/Header'
import Footer from '../../../components/AdminComponents/Footer/Footer'
import Project from '../../../components/AdminComponents/Project/Project'
import Completed from './Completed'

function ProjectDisplay() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header headers="PROJECT MANAGEMENT"/>
      <Project/>
      <Footer/>
      </div>
  )
}

export default ProjectDisplay
