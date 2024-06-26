import React from "react";
import Header from "../../../components/AdminComponents/Header/Header";
import Footer from "../../../components/AdminComponents/Footer/Footer";
import AddProject from "../../../components/AdminComponents/Project/AddProject";


function ProjectEditing() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
        <Header headers="EDIT PROJECT"/>
            <AddProject />
             <div className="mb-24"></div>
        <Footer />
      
    </div>
  )
}

export default ProjectEditing



