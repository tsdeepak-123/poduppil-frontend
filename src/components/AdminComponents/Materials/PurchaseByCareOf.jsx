import React, { useEffect, useState } from "react";
import { axiosAdmin } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import Search from "../../CommonComponents/Search/Search";
import Loading from "../../CommonComponents/Loading/Loading";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

function PurchaseByCareOf() {
  const [purchaseData, setPurchaseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Assuming 10 items per page
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`purchasebycareof`);
      setPurchaseData(response?.data?.PurchaseList);
      setFilteredData(response?.data?.PurchaseList);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter data based on search term
    const filtered = purchaseData.filter(item =>
      item._id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, purchaseData]);

  const handleViewDetails = (purchase) => {
    navigate('/admin/materialpurchasebycredit', { state: purchase });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Paginate the filtered data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex mx-24 justify-between max-w-[80%] mt-24">
            <div>
            <Search value={searchTerm} onChange={handleSearch} />
            </div>
                      {/* Pagination controls */}
          <div className="flex justify-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-3 py-1 mr-2 bg-gray-200 text-gray-500 rounded"
            >
              <KeyboardArrowLeft/>
            </button>
            <span className="text-gray-600 mt-2">{currentPage} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage * itemsPerPage >= filteredData.length}
              className="px-3 py-1 ml-2 bg-gray-200 text-gray-500 rounded"
            >
              <KeyboardArrowRight/>
            </button>
          </div>
          </div>
          <div className="relative overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg mt-11 ms-6 me-6 max-h-[500px]">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    CareOf
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                        {item._id}
                      </td>
                      <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                        {Math.floor(item.TotalAmount)}
                      </td>
                      <td
                        className="px-6 py-4 font-medium cursor-pointer text-blue-500"
                        onClick={() => handleViewDetails(item)}
                      >
                        View
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
        </>
      )}
    </>
  );
}

export default PurchaseByCareOf;
