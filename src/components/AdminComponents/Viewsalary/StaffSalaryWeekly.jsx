import React, { useEffect, useState } from "react";
import { axiosAdmin } from "../../../Api/Api";
import SalaryStatusDrodown from "./SalaryStatusDrodown";
import Loading from "../../CommonComponents/Loading/Loading";

function StaffSalaryWeekly() {
    const [salaryData, setSalaryData] = useState();
    const fetch = async () => {
      try {
        const response = await axiosAdmin.get("allStaffsalaryhistory");
        setSalaryData(response?.data.updatedStaffSalaryData);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.replace("/admin/login")
        }
      }
    };
  
    useEffect(() => {
      fetch();
    }, []);
  return (
    <>
          <div className="flex justify-center font-bold mt-8">
      <h2>STAFFS SALARY</h2>
      </div>

      {
        !salaryData ? (
<Loading/>
        ):(
<>
       <div className="flex justify-center mt-8">
        <div class="w-[90%] overflow-y-scroll relative overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] ">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-16 py-3">
                  Labour Name
                </th>
                <th scope="col" class="px-16 py-3">
                  Salary
                </th>
                <th scope="col" class="px-16 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {
                salaryData && salaryData?.length>0 ?(
                salaryData?.map((item)=>
                <tr key={item?._id} class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td
                  scope="row"
                  class="px-16 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                > {item?.StaffId?.name}</td>
                <td
                  scope="row"
                  class="px-16 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >{item.records[0].updatedSalary}</td>
                <td
                  scope="row"
                  class="px-16 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                ><SalaryStatusDrodown status={item.records[0].Is_status} staffId={item?.records[0]?._id}/></td>
              </tr>
                )):(
                    <tr>
                    <td colspan="8" class="text-center py-4">
                      No data available
                      
                    </td>
                  </tr>
                )
               
              }
            </tbody>
          </table>
        </div>
      </div>
</>
        )
      }

    
    </>
  )
}

export default StaffSalaryWeekly