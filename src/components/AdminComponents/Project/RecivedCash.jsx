import React, { useState } from 'react'
import ReturnButton from '../../CommonComponents/Return/ReturnButton'
import RecivedCashModal from './RecivedCashModal'
import CashTable from "../../AdminComponents/Project/CashTable"
import { axiosAdmin } from '../../../Api/Api';

function RecivedCash() {
const[cashData,setCashData]=useState()

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("recievedcash")
      setCashData(response?.data?.totalAmountReceived);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  return (
    <>
    <ReturnButton/>
    <div className='flex justify-end me-36 mt-14'>
    <RecivedCashModal/>
    </div>
    <CashTable RecievedData={cashData} fetchData={fetchData}/>
    </>
  )
}

export default RecivedCash