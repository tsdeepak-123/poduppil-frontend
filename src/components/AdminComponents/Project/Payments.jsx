import React, { useEffect, useState } from "react";
import { axiosAdmin } from "../../../Api/Api";
import FormatDate from "../../../utils/FormatDate"

function Payments({ projectId }) {
  const [cashData, setCashData] = useState();

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`recievedcashbyproject?id=${projectId}`);
      setCashData(response?.data?.paymentRecords);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <>
      <div className="flex justify-center mt-14">
        <div className="w-[30%] relative overflow-y-scroll overflow-x-auto shadow-md sm:rounded-lg max-h-[500px]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment type
                </th>
              </tr>
            </thead>
            <tbody>
              {cashData && cashData.length>0 ? (
                cashData.map((item, index) => (
                  <tr key={index} className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                      {FormatDate(item.date)}
                    </td>
                    <td className="px-6 py-4 font-medium text-green-600 whitespace-nowrap dark:text-white">
                      + {item.amount}
                    </td>
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                      {item.payment}
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
    </>
  );
}

export default Payments;
