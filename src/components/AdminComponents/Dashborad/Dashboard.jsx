import React from 'react'
import ItemCard from '../../CommonComponents/Card/ItemCard'
import { useNavigate } from 'react-router-dom'
import Footer from "../../AdminComponents/Footer/Footer"

function Dashboard() {
  const navigate=useNavigate()
  const handleLabourView=()=>{
    navigate('/admin/labourdetails')
  }
  const handleProjectView=()=>{
    navigate('/admin/projectdetails')
  }
  const handleStaffView=()=>{
    navigate('/admin/staffdetails')
  }
  const handleContractView=()=>{
    navigate('/admin/contractdetails')
  }
  const handleOfficeView=()=>{
    navigate('/admin/officedetails')
  }
  const handleMaterialView=()=>{
    navigate('/admin/projectlist')
  }
  return (
    <div className='flex flex-col justify-between h-screen'>
    <div className='grid grid-cols-1 px- sm:grid-cols-2  md:grid-cols-3 mt-14'>
      <ItemCard classes={'mx-auto mt-16'} name="PROJECTS" discription="" navigation={handleProjectView}/>
      <ItemCard classes={'mx-auto mt-16'} name="LABOURS" discription="" navigation={handleLabourView}/>
      <ItemCard classes={'mx-auto mt-16'} name="STAFFS" discription="" navigation={handleStaffView}/>
      <ItemCard classes={'mx-auto mt-16'} name="OFFICE" discription="" navigation={handleOfficeView}/>
      <ItemCard classes={'mx-auto mt-16'} name="CONTRACT WORK" discription="" navigation={handleContractView}/>
      <ItemCard classes={'mx-auto mt-16'} name="MATERIAL PURCHASE" discription="" navigation={handleMaterialView}/>
      </div>
      <div className='mt-4'>
      <Footer/>
      </div>
    </div>
  )
}

export default Dashboard
