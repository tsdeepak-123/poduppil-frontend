import React, { useEffect, useState } from "react";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import { axiosAdmin } from "../../../Api/Api";
import { useLocation } from "react-router-dom";
import moment from "moment";
import Nodata from "../../CommonComponents/Nodata/Nodata"
import Loading from "../../CommonComponents/Loading/Loading";

function SalaryHistory() {
  const location = useLocation();
  const [SalaryData, setSalaryData] = useState([]);
  const staffId = location?.state?.staffId;
  const labourId = location?.state?.labourId;

  const fetchData = async () => {
    try {
      if (staffId) {
        const response = await axiosAdmin.get(`handleStaffSalaryById?id=${staffId}`);
        setSalaryData(response?.data?.StaffSalaryData || []);
      } else {
        const response = await axiosAdmin.get(`handleLabourSalaryById?id=${labourId}`);
        setSalaryData(response?.data?.LabourSalaryData || []);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [staffId, labourId]);

  return (
    <>
      <ReturnButton />
      {
        !SalaryData ?(
<Loading/>
        ):(
          SalaryData.length > 0 ? (
            SalaryData.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={item.StaffId ? item?.StaffId?.photo : item?.laborerId?.photo}
                  alt="User"
                  className="w-32 h-32 rounded-full"
                />
                <h2 className="mt-4 text-xl font-bold uppercase">
                  {item.StaffId ? item?.StaffId?.name : item?.laborerId?.name}
                </h2>
                <p>
                  {item.StaffId ? `+91 ${item?.StaffId?.phone}` : `+91 ${item?.laborerId?.phone}`}
                </p>
                <div className="flex justify-center mt-8">
                  <div className="w-[80%] relative overflow-y-scroll overflow-x-auto shadow-md sm:rounded-lg max-h-[500px]">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      {/* Table headers */}
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Salary
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Table data */}
                        {item.records && item.records.length > 0 ? (
                          item.records.map((record, recordIndex) => (
                            <tr
                              key={recordIndex}
                              className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                            >
                              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {moment(record.date).format("DD-MM-YYYY")}
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {record.totalSalary}
                              </td>
                              <td
                                className={`px-6 py-4 font-medium whitespace-nowrap ${
                                  record.Is_status === "paid"
                                    ? "text-green-500"
                                    : record.Is_status === "pending"
                                    ? "text-red-500"
                                    : "text-yellow-500"
                                }`}
                              >
                                {record.Is_status}
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
              </div>
            ))
          ) : (
            <div>
                <Nodata/>
            </div>
          )
        )
    }
    </>
  );
}

export default SalaryHistory;
