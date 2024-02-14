import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header";
import CompletedProjects from '../../../components/AdminComponents/Project/CompletedProjects';

function Completed() {
  return (
    <div>
        <Header headers='COMPLETED PROJECTS'/>
        <CompletedProjects/>
    </div>
  )
}

export default Completed