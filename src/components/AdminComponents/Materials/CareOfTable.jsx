import React, { useEffect, useState } from "react";
import { axiosAdmin } from "../../../Api/Api";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment"
import Swal from "sweetalert2";
import SwalMessage from "../../../utils/SwalMessage";

function CareOfTable() {
  const [CareOf, setCareOf] = useState();

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`getcareof`);
      setCareOf(response?.data?.allCareOfs);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [CareOf]);


  const handleDeleteCareOf = async (id) => {
    try {
      const admin=true
      const status= SwalMessage(`deletecareof?id=${id}`, "Careof", "Delete",admin)
        if(status.success){
          Swal.fire(
            `Careof deleted successfully` ,
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
      <div className="flex justify-center mt-14">
        <div className="w-[30%] relative overflow-y-scroll overflow-x-auto shadow-md sm:rounded-lg max-h-[500px]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                 Action
                </th>
              </tr>
            </thead>
            <tbody>
              {CareOf && CareOf.length>0 ? (
                CareOf.map((item, index) => (
                  <tr key={index} className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                    <DeleteIcon className="text-red-500 cursor-pointer" onClick={() => {
                          handleDeleteCareOf(item?._id);
                        }}/>
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

export default CareOfTable;
