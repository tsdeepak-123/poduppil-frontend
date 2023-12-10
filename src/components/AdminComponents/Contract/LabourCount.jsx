import React, { useEffect, useState } from "react";
import { axiosAdmin } from "../../../Api/Api";
import FormatDate from "../../../utils/FormatDate"
import Loading from "../../CommonComponents/Loading/Loading";

function Payments({ contractId }) {
  const [LabourData, setLabourData] = useState();

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`getlabourcountbyid?id=${contractId}`);
      setLabourData(response?.data?.LabourRecords);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }

    }
  };

  useEffect(() => {
    fetchData();
  }, [LabourData]);

  return (
    <>
    {
      !LabourData ? (
<Loading/>
      ):(
        <div className="flex justify-center mt-14">
        <div className="w-[30%] relative overflow-y-scroll overflow-x-auto shadow-md sm:rounded-lg max-h-[500px]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Main labour
                </th>
                <th scope="col" className="px-6 py-3">
                  Helpers
                </th>
              </tr>
            </thead>
            <tbody>
              {LabourData && LabourData.length>0 ? (
                LabourData.map((item, index) => (
                  <tr key={index} className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                      {FormatDate(item.date)}
                    </td>
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                      {item.mainLabour}
                    </td>
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                      {item.helpers}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
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

export default Payments;
