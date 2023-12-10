import React, { useEffect, useState } from "react";
import { axiosAdmin } from "../../../Api/Api";
import FormatDate from "../../../utils/FormatDate"
import { useNavigate } from "react-router-dom";
import Loading from "../../CommonComponents/Loading/Loading";


function SingleByProject({ projectname}) {
  const [ContractData, setContractData] = useState();
  const navigate=useNavigate()


  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`getcontractsbyid?projectname=${projectname}`);
      setContractData(response?.data?.allContractsById);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }

    }
  };

  useEffect(() => {
    fetchData();
  }, []);

const handleSingleView=(id)=>{
    navigate("/admin/contractview", { state: { id } });
}

  return (
    <>
    {
      !ContractData ?(
<Loading/>
      ):(
        <div className="flex justify-center mt-14">
        <div className="w-[90%] relative overflow-y-scroll overflow-x-auto shadow-md sm:rounded-lg max-h-[500px]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Contract Work
                </th>
                <th scope="col" className="px-6 py-3">
                  Contractor Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Detailed View
                </th>
              </tr>
            </thead>
            <tbody>
              {ContractData && ContractData.length > 0 ? (
                ContractData.map((item, index) => (
                  <tr key={index} className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                      {FormatDate(item.date)}
                    </td>
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                      {item.Contractwork}
                    </td>
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                      {item.Contractorname}
                    </td>
                    <td className="px-6 py-4 font-medium cursor-pointer text-blue-500" onClick={()=>handleSingleView(item._id)}>
                      view
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )
    }
     
    </>
  );
}

export default SingleByProject;
