
import React, { useEffect, useState } from "react";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import { axiosAdmin } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import Nodata from "../../CommonComponents/Nodata/Nodata"
import Loading from "../../CommonComponents/Loading/Loading";

function CompletedContracts() {
  const [contractData, setContractData] = useState([]);
  const navigate = useNavigate();

  // fetching data from backend
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("ContractList?status=true");
      setContractData(response?.data?.FindContract || []);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login")
      }
    }
  };

  //data displaying when mounting
  useEffect(() => {
    fetchData();
  }, []);

  const nav = (id) => {
    navigate("/admin/contractview", { state: { id } });
  };

  return (
    <>
      <ReturnButton />
      {
      !contractData ? (
<Loading/>
      ):(
   
        contractData.length ? (
          <div className="flex justify-center mt-8">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">          <tr>
              <th scope="col" class="px-6 py-3">
                Project name
              </th>
              <th scope="col" class="px-6 py-3">
                Contract work name
              </th>
              <th scope="col" class="px-6 py-3">
                Details
             </th>
           </tr>
         </thead>
          <tbody>
            {
              contractData?.map((data) => {
                return (
                  <tr
                    key={data?._id}
                    className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{data?.projectname}</td>
                    <td className="px-6 py-4">{data?.Contractwork}</td>
                    <td
                      className="px-6 py-4 text-blue-500 cursor-pointer"
                      onClick={() => nav(data?._id)}
                    >
                      View
                    </td>
                  </tr>
                );
              })
            
            }
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <Nodata />
        )
      )
      
   }
    </>
  );
}

export default CompletedContracts;

