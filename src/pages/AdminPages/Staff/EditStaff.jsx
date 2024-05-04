import React from 'react'
import Header from "../../../components/AdminComponents/Header/Header";
import Footer from "../../../components/AdminComponents/Footer/Footer";
import AddStaff from '../../../components/AdminComponents/Staffs/AddStaff';

function EditStaff() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
        <Header headers="EDIT STAFF"/>
        <AddStaff/>
        <Footer />
    </div>
  )
}

export default EditStaff