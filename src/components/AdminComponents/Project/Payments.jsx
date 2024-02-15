import React, { useEffect, useState } from "react";
import { axiosAdmin } from "../../../Api/Api";
import FormatDate from "../../../utils/FormatDate"
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import SwalMessage from "../../../utils/SwalMessage";

function Payments({ projectId }) {
  const [cashData, setCashData] = useState();
  const [totalPayment, setTotalPayment] = useState();

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`recievedcashbyproject?id=${projectId}`);
      setCashData(response?.data?.paymentRecords);
      setTotalPayment(response?.data?.totalPayment)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [cashData]);


  const handleDeleteReceivedCash = async (id,projectId) => {
    try {
      const admin=true
      const status= SwalMessage(`deletereceivedcash?id=${id}&projectId=${projectId}`, "Received cash", "Delete",admin)
        if(status.success){
          Swal.fire(
            `Received cash deleted successfully` ,
            '',
            'success'
          )
        }
    } catch (error) {
      if (error.response && error.response.status === 401){
        window.location.replace("/admin/login");
      }
    }
  };


  return (
    <>
     <div className="flex justify-center">
  <p className="mt-8 mb-2 text-lg font-bold">
    Total Payment &nbsp;:
    <span className="text-green-600 ml-2">{Math.floor(totalPayment)}</span>
  </p>
</div>
      <div className="flex justify-center mt-6">
        <div className="w-[50%] relative overflow-y-scroll overflow-x-auto shadow-md sm:rounded-lg max-h-[500px]">
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
                <th scope="col" className="px-6 py-3">
                  Action
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
                    <td>
                    <DeleteIcon
                          onClick={() => {
                            handleDeleteReceivedCash(item?._id,projectId);
                          }}
                          className="text-red-600 ms-6 cursor-pointer"
                        />
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
