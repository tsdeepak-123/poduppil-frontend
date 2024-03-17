import React, { useEffect, useState } from "react";
import { axiosAdmin } from "../../../../Api/Api";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import SwalMessage from "../../../../utils/SwalMessage";
import moment from "moment";
import ReturnButton from "../../../CommonComponents/Return/ReturnButton";
import AddExpenseModal from "./AddExpenseModal";
import Footer from "../../Footer/Footer";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

function OwnerExpense() {
  const [cashData, setCashData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await axiosAdmin.get(`getownerexpense?page=${page}`);
      console.log("Fetched data:", response.data);
      setCashData(response?.data?.expenses || []);
      setTotalPages(response?.data?.totalPages || 1); // Assuming backend sends total pages
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage,cashData]);

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

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <ReturnButton navigation={'/admin/officedetails'}/>
      <div className="relative top-4 right-72 flex justify-end">
        <AddExpenseModal />
      </div>
      <div className="flex justify-center mb-14 ">
        <div className="w-[60%] relative overflow-y-scroll overflow-x-auto shadow-md sm:rounded-lg max-h-[500px]">
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
        </div>
      </div>
      <div className="flex justify-center mt-4">
  <button className="mx-2 px-3 py-1 bg-gray-200 text-gray-500 rounded" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
    <KeyboardArrowLeft />
  </button>
  <span>{currentPage} of {totalPages}</span>
  <button className="mx-2 px-3 py-1 bg-gray-200 text-gray-500 rounded" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
    <KeyboardArrowRight />
  </button>
</div>
      <Footer/>
    </div>
  );
}

export default OwnerExpense;
