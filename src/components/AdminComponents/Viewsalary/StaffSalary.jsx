import React, { useEffect, useState } from 'react'
import Buttons from '../../CommonComponents/Button/Buttons'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useLocation, useNavigate } from 'react-router-dom'
import { axiosAdmin } from '../../../Api/Api'
import{LuIndianRupee}from 'react-icons/lu'
import AdvanceModal from './AdvanceModal';
import ReturnButton from '../../CommonComponents/Return/ReturnButton';
import Loading from "../../CommonComponents/Loading/Loading";

function StaffSalarys() {
  const location=useLocation()
  const staffId=location?.state?.id
  const[StaffData,setStaffData]=useState()
  const[selectedDate,setselectedDate]=useState()
const navigate=useNavigate()

    // fetching data from backend
    const fetchData = async () => {
      try {
        const response = await axiosAdmin.get(`staffsalary?staffId=${location?.state?.id}`);
  
        setStaffData(response?.data?.salaryData);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.replace("/admin/login");
        }
      }
    };
  
    //data displayin when mounting
    useEffect(() => {
      fetchData();
    }, []);



const inputDate = new Date(StaffData?.calculateTo);
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const day = inputDate.getUTCDate();
const month = months[inputDate.getUTCMonth()];
const year = inputDate.getUTCFullYear();
const formattedDate = `${day} / ${month} / ${year}`;


  const salaryoflabour=async()=>{
    try {
      const response = await axiosAdmin.post(`salaryofStaff?staffId=${location?.state?.id}&staffSalarydate=${selectedDate}`);
      window.location.reload();

    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login")
      }
    }

  }

   const datePortion = StaffData?.StaffData?.lastsalaryDate?.match(/^\d{4}-\d{2}-\d{2}/)[0];
  
  
if (datePortion) {

  const originalDate = new Date(datePortion);

 
  originalDate.setDate(originalDate.getDate());


  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, "0");
  const day = String(originalDate.getDate()).padStart(2, "0");

 var newDate = `${year}-${month}-${day}`;
} 

  return (
    <>
      <ReturnButton/>
      {
        !StaffData ? (
<Loading/>
        ):(
          <div class="container mx-auto p-4">
          <div class="flex items-center justify-center gap-5 mb-4">
            <div>
              <img
                src={StaffData?.StaffData?.photo}
                alt="User Photo"
                class="w-[150px] h-[150px] rounded-full"
              />
            </div>
            <div>
              <h2 className="font-semibold text-xl">
                {StaffData?.StaffData?.name}
              </h2>
              <h5>{StaffData?.StaffData?.phone}</h5>
            </div>
          </div>
          <div className="flex justify-end">
            <AdvanceModal
              staffId={StaffData?.StaffData?._id}
              fetchData={fetchData}
            />
          </div>
          <h1 class="text-2xl font-bold mb-4">Salary Details</h1>
  
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h2 class="text-lg font-semibold mb-2">Basic Salary</h2>
  
              <p className="flex">
                <LuIndianRupee className="mt-1" />{" "}
                {StaffData?.StaffData?.salary}
              </p>
            </div>
  
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h2 class="text-lg font-semibold mb-2">Attendance Details</h2>
              <p>Present &nbsp;&nbsp;&nbsp;&nbsp;: {StaffData?.present} days</p>
              <p>Halfday &nbsp;&nbsp;&nbsp;&nbsp;: {StaffData?.halfday}days</p>
              <p>
                Absent &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {StaffData?.absent} days
              </p>
            </div>
  
            {StaffData?.lastweek ? (
              <div class="bg-white p-6 rounded-lg shadow-lg">
                <h2 class="text-lg font-semibold mb-2">Salary</h2>
                <p className="flex">
                  <LuIndianRupee className="mt-1" />
                  {StaffData?.lastweek}
                </p>
              </div>
            ) : (
              ""
            )}
            {StaffData?.advance || StaffData?.advance == 0 ? (
              <div class="bg-white p-6 rounded-lg shadow-lg">
                <h2 class="text-lg font-semibold mb-2">Advance</h2>
                <p className="flex">
                  <LuIndianRupee className="mt-1" />
                  {StaffData?.advance}
                </p>
              </div>
            ) : (
              ""
            )}
            {StaffData?.balance ? (
              <div class="bg-white p-6 rounded-lg shadow-lg">
                <h2 class="text-lg font-semibold mb-2">Balance</h2>
                <p className="flex">
                  <LuIndianRupee className="mt-1" />
                  {StaffData?.balance}
                </p>
              </div>
            ) : (
              ""
            )}
  
            {StaffData?.updatedSalary ? (
              <div class="bg-white p-6 rounded-lg shadow-lg">
                <h2 class="text-lg font-semibold mb-2">Amount to be paid</h2>
                <p className="flex">
                  <LuIndianRupee className="mt-1" />
                  {StaffData?.updatedSalary}
                </p>
              </div>
            ) : (
              ""
            )}
  
            {StaffData?.calculateTo ? (
              <div class="bg-white p-6 rounded-lg shadow-lg">
                <h2 class="text-lg font-semibold mb-2">Calculated At</h2>
                <p className="flex">{formattedDate}</p>
              </div>
            ) : (
              ""
            )}
  
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h2 class="text-lg font-semibold mb-2">Salary History</h2>
              <p className="text-blue-500 cursor-pointer" onClick={()=>{navigate("/admin/salaryhistory",{state:{staffId}})}}>View History</p>
            </div>
            <div className="mt-6 flex flex-row gap-4">
  
              <input
                type="date"
                value={selectedDate}
                min={newDate}
                onChange={(e) => {
                  setselectedDate(e.target.value);
                }}
              />
  
              <Buttons
                click={salaryoflabour}
                name="Calculate salary"
                className="justify-center"
                classes={"h-14"}
              />
            </div>
          </div>
        </div>
      
        )
      }
  
    </>
  )
}

export default StaffSalarys
