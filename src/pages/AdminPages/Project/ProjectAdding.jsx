import React from "react";
import Header from "../../../components/AdminComponents/Header/Header";
import Footer from "../../../components/AdminComponents/Footer/Footer";
import AddProject from "../../../components/AdminComponents/Project/AddProject";

function ProjectAdding() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header headers="ADD NEW PROJECT"/>
      <AddProject />
      <Footer />
    </div>
  );
}

export default ProjectAdding;
