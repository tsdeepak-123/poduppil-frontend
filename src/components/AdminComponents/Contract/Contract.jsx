import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosAdmin } from "../../../Api/Api";
import AddNav from "../../CommonComponents/AddNav/AddNav";
import EditIcon from "@mui/icons-material/Edit";
import Buttons from "../../CommonComponents/Button/Buttons";
import Loading from "../../CommonComponents/Loading/Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import SwalMessage from "../../../utils/SwalMessage";

function Contract() {
  const navigate = useNavigate();
  const [contractData, setContractData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddContractClick = () => {
    navigate("/admin/addcontract");
  };

  const handleAddCompletedContract = () => {
    navigate("/admin/completedcontracts");
  };

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("ContractList?status=false");
      setContractData([...response?.data?.FindContract]);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  const handleDeleteContract = async (id, e) => {
    try {
      const admin = true;
      const status = SwalMessage(
        `deletecontract?id=${id}`,
        "Contract",
        "Delete",
        admin
      );
      if (status.success) {
        Swal.fire(`contract deleted successfully`, "", "success");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [contractData]);

  const nav = (id) => {
    navigate("/admin/contractview", { state: { id } });
  };

  const editpage = (data) => {
    navigate("/admin/editcontract", { state: { data } });
  };

  const filteredContracts = contractData.filter((data) =>
    data.projectname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="w-full flex">
        <div className="w-full">
          <AddNav
            name="+ ADD NEW CONTRACT"
            click={handleAddContractClick}
            value={searchTerm}
            onChange={handleSearch}
            navigation={"/admin/dashboard"}
            viewClick={handleAddCompletedContract}
            twoButton={true}
            viewButtonName="COMPLETED CONTRACTS"
          />
        </div>
      </div>
      {contractData === null ? (
        <Loading />
      ) : (
        <div className="relative overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg mt-11 ms-6 me-6 max-h-[500px]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Sl.No
                </th>
                <th scope="col" class="px-6 py-3">
                  Project Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Contractor
                </th>
                <th scope="col" class="px-6 py-3">
                  Phone
                </th>
                <th scope="col" class="px-6 py-3">
                  Contract Work
                </th>
                <th scope="col" class="px-6 py-3">
                  Total Amount
                </th>
                <th scope="col" class="px-6 py-3">
                  Details
                </th>
                <th scope="col" class="px-6 py-3">
                  Edit
                </th>
                <th scope="col" class="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.length > 0 ? (
                filteredContracts.map((data, index) => (
                  <tr
                    key={data._id}
                    className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6">{data?.project?.name}</td>
                    <td className="py-4 px-6">{data?.Contractorname}</td>
                    <td className="py-4 px-6">{data?.phone}</td>
                    <td className="py-4 px-6">{data?.Contractwork}</td>
                    <td className="py-4 px-6">{data?.Amount}</td>
                    <td
                      className="text-blue-500 cursor-pointer py-4 px-6"
                      onClick={() => nav(data._id)}
                    >
                      View
                    </td>
                    <td className="font-medium cursor-pointer">
                      <EditIcon
                        onClick={() => editpage(data)}
                        className="text-yellow-600"
                      />
                    </td>
                    <td
                      scope="row"
                      class="px-6 py-4 font-medium text-red-500 cursor-pointer"
                      onClick={() => handleDeleteContract(data._id)}
                    >
                      <DeleteIcon />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Contract;
