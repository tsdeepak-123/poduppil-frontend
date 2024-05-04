import React, { useEffect, useState } from "react";
import { axiosAdmin } from "../../../Api/Api";
import Loading from "../../CommonComponents/Loading/Loading";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import AddNav from "../../CommonComponents/AddNav/AddNav";
import DeleteIcon from "@mui/icons-material/Delete";
import SwalMessage from "../../../utils/SwalMessage";
import Swal from "sweetalert2";

function RecentPurchase() {
  const [purchaseData, setPurchaseData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchPurchaseData = async () => {
    try {
      setLoading(true);
      const response = await axiosAdmin.get("recentpurchase");
      setPurchaseData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching purchase data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseData();
  }, []);

  const filteredPurchaseData = purchaseData?.filter((obj) =>
    obj.projectname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePurchaseClick = () => {
    navigate("/admin/purchasematerial");
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleProjects = () => {
    navigate("/admin/projectdetails");
  };


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
 
  console.log(filteredPurchaseData);

  return (
    <>
      <div className="">
        <AddNav
          name="+ PURCHASE MATERIAL"
          click={handlePurchaseClick}
          value={searchTerm}
          onChange={handleSearch}
          navigation={"/admin/dashboard"}
          viewClick={handleProjects}
          twoButton={true}
          viewButtonName="View Projects"
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
        <p className='flex justify-center font-serif mt-14 font-bold text-[30px]'>Recent Purchase</p>
        <div className="relative overflow-x-scroll overflow-y-scroll shadow-md sm:rounded-lg mt-11 ms-6 me-6 max-h-[500px]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Project Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Care Of
                </th>
                <th scope="col" className="px-6 py-3">
                  Materials
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {filteredPurchaseData && filteredPurchaseData.length > 0 ? (
                filteredPurchaseData.map((purchase) => {
                  return (
                    <tr
                      key={purchase._id}
                      className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{purchase.projectname}</td>
                      <td className="px-6 py-4">
                        {moment(purchase.date).format("DD-MM-YYYY")}
                      </td>
                      <td className="px-6 py-4">
                        <ul>
                          {purchase.Material.map((material, index) => (
                            <li key={index}>
                              {material.careof}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4">
                        <ul>
                          {purchase.Material.map((material, index) => (
                            <li key={index}>
                              {material.name} - Quantity: {material.quantity}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4">
                        <DeleteIcon
                          className="text-red-600 ms-6 cursor-pointer"
                          onClick={() => {
                            handleDeleteBill(purchase._id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })
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
        </>
      )}
    </>
  );
}

export default RecentPurchase;
