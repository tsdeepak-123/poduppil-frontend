import React from "react";
import AddLabour from "../../../components/AdminComponents/Labour/AddLabour";
import Header from "../../../components/AdminComponents/Header/Header";
import Footer from "../../../components/AdminComponents/Footer/Footer";

function LabourEditing() {
  return (
    <div>
      <Header headers="EDIT LABOUR" />
      <AddLabour />
    </div>
  );
}

export default LabourEditing;
