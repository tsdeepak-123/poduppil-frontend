import React, { useEffect, useState } from "react";
import { axiosAdmin } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import Search from "../../CommonComponents/Search/Search";
import MaterialListModal from "./MaterialListModal";
import Loading from "../../CommonComponents/Loading/Loading";

function PurchaseByCareOf({ projectname }) {
  const [PurchaseData, setPurchaseData] = useState(null);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`purchasebycareof`);
      setPurchaseData(response?.data?.PurchaseList);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (purchase) => {
    setSelectedPurchase(purchase);
    setShowModal(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPuchaseData = PurchaseData?.filter((obj) =>
    obj._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
     
        { !filteredPuchaseData ? (
          <Loading />
        ) : (
          <>
          <div className="ms-6">
          <Search value={searchTerm} onChange={handleSearch} />
        </div>
        <div className="relative overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg mt-11 ms-6 me-6 mx-h-[500px]">
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
              {filteredPuchaseData ? (
                filteredPuchaseData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                      {item._id}
                    </td>
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                      {item.TotalAmount}
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

      <div>
        <MaterialListModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedPurchase={selectedPurchase}
        />
      </div>
    </>
  );
}

export default PurchaseByCareOf;
