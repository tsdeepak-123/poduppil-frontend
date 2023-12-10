import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosAdmin } from "../../../Api/Api";
import FormatDate from "../../../utils/FormatDate";
import AddNav from "../../CommonComponents/AddNav/AddNav";
import EditIcon from '@mui/icons-material/Edit';
import Buttons from "../../CommonComponents/Button/Buttons";

function UtilityBills() {
  const [billData, setBillData] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleAddBillClick = () => {
    navigate("/admin/addbills");
  };

  const handlePaidBills = () => {
    navigate("/admin/paidbills");
  };
  const handleSearch=(e)=>{
    setSearchTerm(e.target.value)
  }

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("billslist?status=false");
      setBillData(response.data.allBillData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login")
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  

  const viewBills = (id) => {
    navigate("/admin/billsingleview", { state: { id } });
  };

  const filteredBills = billData
    ? billData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <div className='w-full flex'>
        <div className='w-[80%]'>
          <AddNav name="+ ADD NEW BILL" click={handleAddBillClick} value={searchTerm} onChange={handleSearch} />
        </div>
        <div className='w-[20%] mt-[208px]'>
          <Buttons name="PAID BILLS" click={handlePaidBills} />
        </div>
      </div>
      <div className="relative overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg mt-11 ms-6 me-6 max-h-[500px]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Bills name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Bill Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Paid
              </th>
              <th scope="col" className="px-6 py-3">
                Pending
              </th>
              <th scope="col" className="px-6 py-3">
                Details
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBills && filteredBills.length > 0 ? (
              filteredBills.map((item) => (
                <tr key={item._id} className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{FormatDate(item.date)}</td>
                  <td className="px-6 py-4">{item.amount}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4">{item.paid}</td>
                  <td className="px-6 py-4">{item.pending}</td>
                  <td className="px-6 py-4 text-blue-600 cursor-pointer" onClick={() => viewBills(item._id)}>View</td>
                  <td className="px-6 py-4 cursor-pointer"><EditIcon className="text-yellow-600"/></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UtilityBills;
