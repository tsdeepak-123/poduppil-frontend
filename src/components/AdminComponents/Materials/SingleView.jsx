import React, { useEffect, useState } from "react";
import FormatDate from "../../../utils/FormatDate";
import Search from "../../CommonComponents/Search/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import SwalMessage from "../../../utils/SwalMessage";
import Buttons from "../../CommonComponents/Button/Buttons";
import { useNavigate } from "react-router-dom";
import { axiosAdmin } from "../../../Api/Api";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

function SingleView({ id }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [materialData, setMaterialData] = useState(null);
  const [filteredMaterialData, setFilteredMaterialData] = useState([]);

  const fetchMaterialData = async () => {
    try {
      const response = await axiosAdmin.get(
        `PurchaseBillById?projectid=${id}&page=${currentPage}&limit=10&searchTerm=${searchTerm}`
      );
      setMaterialData(response?.data?.PurchaseData);
      setTotalPages(Math.ceil(response?.data?.totalCount / 10)); // Assuming limit is 10
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  useEffect(() => {
    fetchMaterialData();
  }, [id, currentPage, searchTerm]);

  const applySearchFilter = (data, term) => {
    return data.filter(
      (material) =>
        material.name?.toLowerCase().includes(term.toLowerCase()) ||
        material.careof?.toLowerCase().includes(term.toLowerCase())
    );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset current page when performing a new search
  };

  const handlePurchase = () => {
    navigate("/admin/purchasematerial");
  };

  useEffect(() => {
    if (materialData && materialData.length > 0) {
      let totalRate = 0;
      let filteredData = [];

      materialData.forEach((data) => {
        let filteredMaterial = [];
        if (searchTerm) {
          filteredMaterial = applySearchFilter(data.Material, searchTerm);

          if (filteredMaterial.length > 0) {
            const materialTotal = filteredMaterial.reduce(
              (acc, material) => acc + parseFloat(material.total || 0),
              0
            );
            totalRate += materialTotal;
            filteredData.push({ ...data, Material: filteredMaterial });
          }
        } else {
          totalRate += parseFloat(data.TotalAmount || 0);
          filteredData.push(data);
        }
      });

      // setFilteredTotalRate(searchTerm ? totalRate : totalRate);
      setFilteredMaterialData(filteredData);
    }
  }, [materialData, searchTerm]);

  const handleDeleteBill = async (id) => {
    try {
      const admin = true;
      const status = SwalMessage(
        `deletepurchasebill?id=${id}`,
        "Bill",
        "Delete",
        admin
      );
      if (status.success) {
        Swal.fire(`Bill deleted successfully`, "", "success");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="mx-20 mt-14 flex justify-between">
        <Search value={searchTerm} onChange={handleSearch} />
        <div>
          <Buttons name="MATERIAL PURCHASE" click={handlePurchase} />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="w-[90%] relative overflow-y-scroll shadow-md sm:rounded-lg max-h-[500px]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Purchase Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Material Name
                </th>
                <th scope="col" className="px-6 py-3">
                  c/o
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Base Rate
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                {!searchTerm ? (
                  <th scope="col" className="px-6 py-3">
                    Total Amount
                  </th>
                ) : (
                  ""
                )}
                {!searchTerm ? (
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                ) : (
                  ""
                )}
              </tr>
            </thead>
            <tbody>
              {filteredMaterialData.length > 0 ? (
                filteredMaterialData.map((data, index) => (
                  <React.Fragment key={index}>
                    {data.Material.map((material, materialIndex) => (
                      <tr
                        key={materialIndex}
                        className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                      >
                        {materialIndex === 0 && (
                          <td
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            rowSpan={data.Material.length}
                          >
                            {FormatDate(data.date)}
                          </td>
                        )}
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {material.name}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {material.careof}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {material.quantity}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {material.baseRate}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {Math.floor(material.total)}
                        </td>
                        {!searchTerm && materialIndex === 0 && (
                          <td
                            className="px-6 py-4 font-medium text-red-500 whitespace-nowrap dark:text-white"
                            rowSpan={data.Material.length}
                          >
                            {Math.floor(data.TotalAmount)}
                          </td>
                        )}
                        {!searchTerm && materialIndex === 0 && (
                          <td
                            className="px-6 py-4 font-medium text-red-500 whitespace-nowrap dark:text-white"
                            rowSpan={data.Material.length}
                          >
                            <DeleteIcon
                              className="text-red-500 cursor-pointer"
                              onClick={() => {
                                handleDeleteBill(data?._id);
                              }}
                            />
                          </td>
                        )}
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-4">
                    No matches found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4">
  <button 
    className="mx-2 px-3 py-1 bg-gray-200 text-gray-500 rounded" 
    onClick={() => handlePageChange(currentPage - 1)} 
    disabled={currentPage === 1}
  >
    <KeyboardArrowLeft />
  </button>
  <span>{currentPage} of {totalPages}</span>
  <button 
    className="mx-2 px-3 py-1 bg-gray-200 text-gray-500 rounded" 
    onClick={() => handlePageChange(currentPage + 1)} 
    disabled={currentPage === totalPages}
  >
    <KeyboardArrowRight />
  </button>
</div>

    </>
  );
}

export default SingleView;
