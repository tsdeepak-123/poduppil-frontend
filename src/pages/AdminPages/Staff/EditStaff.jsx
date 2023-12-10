import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header";
import Footer from "../../../components/AdminComponents/Footer/Footer";
import AddStaff from '../../../components/AdminComponents/Staffs/AddStaff';

function EditStaff() {
  return (
    <div>
        <Header headers="EDIT STAFF"/>
        <AddStaff/>
        <div className="mb-6"></div>
        <Footer />
    </div>
  )
}

export default EditStaff