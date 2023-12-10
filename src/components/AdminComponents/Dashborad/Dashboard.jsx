import React from 'react'
import ItemCard from '../../CommonComponents/Card/ItemCard'
import { useNavigate } from 'react-router-dom'

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
    <div className='flex flex-wrap mx-auto mt-20'>
      <ItemCard classes={'mx-auto mt-16'} name="PROJECTS" discription="" navigation={handleProjectView}/>
      <ItemCard classes={'mx-auto mt-16'} name="LABOURS" discription="" navigation={handleLabourView}/>
      <ItemCard classes={'mx-auto mt-16'} name="STAFFS" discription="" navigation={handleStaffView}/>
      <ItemCard classes={'mx-auto mt-16'} name="OFFICE" discription="" navigation={handleOfficeView}/>
      <ItemCard classes={'mx-auto mt-16'} name="CONTRACT WORK" discription="" navigation={handleContractView}/>
      <ItemCard classes={'mx-auto mt-16'} name="MATERIAL PURCHASE" discription="" navigation={handleMaterialView}/>
    </div>
  )
}

export default Dashboard
