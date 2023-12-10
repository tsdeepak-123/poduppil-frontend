import React from 'react'
import {useNavigate} from "react-router-dom"
import ItemCard from '../../CommonComponents/Card/ItemCard'
import ReturnButton from "../../CommonComponents/Return/ReturnButton"

function Office() {
    const navigate= useNavigate()


    
    const handleAttendance=()=>{
      navigate('/admin/labourattendance')
    }
    const handleUtilitybills=()=>{
      navigate('/admin/utilitybills')
    }
    const handleUserHome=()=>{
      navigate('/admin/userhomecontroll')
    }

    const handleAdminAccount=()=>{
        navigate('/admin/adminaacount')
    }
    const handleSalaryClick=()=>{
        navigate('/admin/salarymanagement')
    }
    const handleRecievedCash=()=>{
        navigate('/admin/recievedcash')
    }
  return (
    <>
<ReturnButton/>
<div className='flex flex-wrap mx-auto'>
      <ItemCard classes={'mx-auto mt-8'} name="ATTENDANCE" discription="" navigation={handleAttendance}/>
      <ItemCard classes={'mx-auto mt-8'} name="UTILITY BILLS" discription="" navigation={handleUtilitybills}/>
      <ItemCard classes={'mx-auto mt-8'} name="SALARY MANAGEMENT" discription="" navigation={handleSalaryClick}/>
      <ItemCard classes={'mx-auto mt-8'} name="RECIEVED CASH" discription="" navigation={handleRecievedCash}/>
      <ItemCard classes={'mx-auto mt-8'} name="USER HOME CONTROLL" discription="" navigation={handleUserHome}/>
      <ItemCard classes={'mx-auto mt-8'} name="ADMIN ACCOUNT" discription="" navigation={ handleAdminAccount}/>

    </div>
</>
  )
}

export default Office
