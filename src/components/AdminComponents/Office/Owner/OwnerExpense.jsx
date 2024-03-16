import React, { useEffect, useState } from "react";
import { axiosAdmin } from "../../../../Api/Api";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import SwalMessage from "../../../../utils/SwalMessage";
import moment from "moment";
import ReturnButton from "../../../CommonComponents/Return/ReturnButton";
import AddExpenseModal from "./AddExpenseModal";

function OwnerExpense() {
  const [cashData, setCashData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("cashdata",cashData);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosAdmin.get(`getownerexpense`);
      console.log("Fetched data:", response.data);
      setCashData(response?.data?.expenses || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteOwnerExpense = async (id) => {
    try {
      const admin = true;
      const status = SwalMessage(`deleteownerexpense?id=${id}`, "Expense", "Delete", admin);
      if (status.success) {
        // Assuming successful deletion from the server, you may want to update state accordingly
        setCashData(cashData.filter(item => item?._id !== id));
        Swal.fire("Expense deleted successfully", "", "success");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      Swal.fire("Error", "Failed to delete expense", "error");
    }
  };

  return (
    <>
      <ReturnButton navigation={'/admin/officedetails'}/>
      <div className="relative flex justify-end mx-80">
        <AddExpenseModal />
      </div>
      <div className="flex justify-center mt-6">
        <div className="w-[50%] relative overflow-y-scroll overflow-x-auto shadow-md sm:rounded-lg max-h-[500px]">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cashData.length > 0 ? (
                  cashData.map((item) => (
                    <tr key={item._id} className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                        {moment(item.date).format('DD-MM-YYYY')}
                      </td>
                      <td className="px-6 py-4 font-medium text-green-600 whitespace-nowrap dark:text-white">
                        {item.item}
                      </td>
                      <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                        {item.payment}
                      </td>
                      <td>
                        <DeleteIcon
                          onClick={() => {
                            handleDeleteOwnerExpense(item._id);
                          }}
                          className="text-red-600 ms-6 cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default OwnerExpense;
