import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosAdmin } from "../../../Api/Api";
import AddNav from '../../CommonComponents/AddNav/AddNav';
import Loading from "../../CommonComponents/Loading/Loading";


function ProjectList() {
  const navigate = useNavigate();
  const [purchaseData, setPurchaseData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePurchaseClick = () => {
    navigate('/admin/purchasematerial');
  };
  const handleSearch=(e)=>{
    setSearchTerm(e.target.value)
  }

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get('/materialtotal');
      setPurchaseData(response?.data?.projectTotals);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };
  
  useEffect(() => {
    fetchData(); 
  }, []);

  const filteredPurchaseData = purchaseData?.filter((obj) =>
  obj.projectname?.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <>
      <AddNav name="+ PURCHASE MATERIAL" click={ handlePurchaseClick} value={searchTerm} onChange={handleSearch}/>
      {!filteredPurchaseData ? (
   <Loading/>
      ):(
        <div className="relative overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg mt-11 ms-6 me-6 mx-h-[500px]" >
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr >
              <th scope="col" className="px-6 py-3">
                Project name
              </th>
              <th scope="col" className="px-6 py-3">
              <span className="flex justify-end">Total purchased amount</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchaseData ? filteredPurchaseData && filteredPurchaseData.map((item, index) => (
              <tr key={index} className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.projectname}
                </td>
                <td className="px-6 py-4 font-medium text-green-500 whitespace-nowrap dark:text-white">
                 <span className="flex justify-end">{item.totalAmount}</span>         
                </td>
              </tr>
            )):
            <tr>
            <td colspan="8" class="text-center py-4">
              No data available
              
            </td>
          </tr>
            }
          </tbody>
        </table>

    </div>
      )

      }
      
    </>
  );
}

export default ProjectList;
