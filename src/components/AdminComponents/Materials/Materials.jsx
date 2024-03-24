import React, { useEffect, useState } from "react";
import { axiosAdmin } from "../../../Api/Api";
import DeleteIcon from "@mui/icons-material/Delete";
import SwalMessage from "../../../utils/SwalMessage";
import Swal from "sweetalert2";

function Materials() {
  const [materialData, setMaterialData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [materialsPerPage] = useState(10); // Number of materials per page

  const fetchMaterialData = async () => {
    try {
      const response = await axiosAdmin.get("allmateriallist");
      setMaterialData(response?.data?.allMaterials || []);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  useEffect(() => {
    fetchMaterialData();
  }, [materialData]);

  // Logic to get current materials
  const indexOfLastMaterial = currentPage * materialsPerPage;
  const indexOfFirstMaterial = indexOfLastMaterial - materialsPerPage;
  const currentMaterials = materialData.slice(
    indexOfFirstMaterial,
    indexOfLastMaterial
  );

  const handleDeleteMaterial = async (id) => {
    try {
      const admin = true;
      const status = SwalMessage(
        `deletematerial?id=${id}`,
        "Material",
        "Delete",
        admin
      );
      if (status.success) {
        setMaterialData(materialData.filter((item) => item?._id !== id));
        Swal.fire("Expense deleted successfully", "", "success");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      Swal.fire("Error", "Failed to delete expense", "error");
    }
  };

  // Pagination
  const totalPages = Math.ceil(materialData.length / materialsPerPage);

  return (
    <>
      <div className="overflow-x-auto flex justify-center ">
        <table className="min-w-[40%] divide-y  divide-gray-200" id="myTable">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentMaterials.map((material) => (
              <tr key={material._id}>
                <td className="px-6 py-4 whitespace-nowrap">{material.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <DeleteIcon
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      handleDeleteMaterial(material._id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-8">
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
          disabled={currentPage === 1}
          className="mr-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          {"<"}
        </button>
        <span className="mx-4">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="ml-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          {">"}
        </button>
      </div>
    </>
  );
}

export default Materials;
