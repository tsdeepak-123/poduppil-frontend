import React from 'react'
import {useNavigate} from "react-router-dom"
import ItemCard from '../../CommonComponents/Card/ItemCard'
import ReturnButton from "../../CommonComponents/Return/ReturnButton"
import Footer from "../../AdminComponents/Footer/Footer"
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
    const handleOwnerExpense=()=>{
        navigate('/admin/ownerexpense')
    }
    const handleCredit=()=>{
        navigate('/admin/creditbalance')
    }
  return (
    <>
<ReturnButton navigation={"/admin/dashboard"}/>
<div className='flex flex-col justify-between h-screen'>
<div className='grid grid-cols-1 px- sm:grid-cols-2  md:grid-cols-3 mt-14'>
      <ItemCard classes={'mx-auto mt-8'} name="ATTENDANCE" discription="" navigation={handleAttendance}/>
      <ItemCard classes={'mx-auto mt-8'} name="UTILITY BILLS" discription="" navigation={handleUtilitybills}/>
      <ItemCard classes={'mx-auto mt-8'} name="SALARY MANAGEMENT" discription="" navigation={handleSalaryClick}/>
      <ItemCard classes={'mx-auto mt-8'} name="RECIEVED CASH" discription="" navigation={handleRecievedCash}/>
      <ItemCard classes={'mx-auto mt-8'} name="USER HOME CONTROLL" discription="" navigation={handleUserHome}/>
      <ItemCard classes={'mx-auto mt-8'} name="ADMIN ACCOUNT" discription="" navigation={ handleAdminAccount}/>
      <ItemCard classes={'mx-auto mt-8'} name="OWNER EXPENSE" discription="" navigation={ handleOwnerExpense}/>
      <ItemCard classes={'mx-auto mt-8'} name="CREDIT BALANCE" discription="" navigation={handleCredit}/>
    </div>
    <div className='mt-4'>
      <Footer/>
    </div>
    </div>
</>
  )
}

export default Office
