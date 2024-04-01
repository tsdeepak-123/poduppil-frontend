import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosAdmin } from "../../../Api/Api";
import AddNav from "../../CommonComponents/AddNav/AddNav";
import Loading from "../../CommonComponents/Loading/Loading";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import SwalMessage from "../../../utils/SwalMessage";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

function Labour() {
  const navigate = useNavigate();
  const [labourData, setLabourData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleAddLabourClick = () => {
    navigate("/admin/addlabour");
  };

  const fetchData = async () => {
    try {
      let currentPageToUpdate = currentPage;
      if (searchTerm !== '') {
        setCurrentPage(1);
        let currentPageToUpdate = currentPage;
    }
      const response = await axiosAdmin.get(`labourslist?page=${currentPageToUpdate}&searchTerm=${searchTerm}`);
      setLabourData(response.data.allLabourData);
      setTotalPages(Math.ceil(response.data.totalCount / 10)); // Assuming 10 items per page
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const nav = (id) => {
    navigate("/admin/viewprofile", { state: { id } });
  };
  const salarypageNavigation = (id) => {
    navigate("/admin/viewsalary", { state: { id } });
  };
  const handleAttendanceButton = (id, LabourName, phone, photo) => {
    navigate("/admin/attendancesingle", {
      state: { id, LabourName, phone, photo },
    });
  };

  const handleEdit = (labourData) => {
    navigate(`/admin/editlabour`, { state: { labourData } });
  };


  const handleDeleteLabour = async (id,e) => {
    try {
      const admin=true
      const status= SwalMessage(`deletelabour?id=${id}`, "Labour", "Delete",admin)
        if(status.success){
          Swal.fire(
            `Labour deleted successfully` ,
            '',
            'success'
          )
        }
    } catch (error) {
      if (error.response && error.response.status === 401){
        window.location.replace("/admin/login");
      }
    }
  };

  return (
    <>
      <AddNav
        name="+ ADD NEW LABOUR"
        click={handleAddLabourClick}
        value={searchTerm}
        onChange={handleSearch}
        navigation={"/admin/dashboard"}
      />
      {!labourData ? (
        <Loading />
      ) : (
        <div className="relative overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg mt-11 ms-6 me-6 max-h-[500px]">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Sl.No
                </th>
                <th scope="col" class="px-6 py-3">
                  Labour name
                </th>
                <th scope="col" class="px-6 py-3">
                  Age
                </th>
                <th scope="col" class="px-6 py-3">
                  Phone number
                </th>
                <th scope="col" class="px-6 py-3">
                  Address
                </th>
                <th scope="col" class="px-6 py-3">
                  Adhaar number
                </th>
                <th scope="col" class="px-6 py-3">
                  Salary Detals
                </th>
                <th scope="col" class="px-6 py-3">
                  Attendance
                </th>
                <th scope="col" class="px-6 py-3">
                  Profile
                </th>
                <th scope="col" class="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {labourData && labourData.length > 0 ? (
                labourData.map((obj,index) => (
                  <tr
                    key={obj._id}
                    class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index+1}
                    </th>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {obj.name}
                    </th>
                    <td class="px-6 py-4">{obj.age}</td>
                    <td class="px-6 py-4">{obj.phone}</td>
                    {obj.address.map((place) => (
                      <td class="px-6 py-4">
                        {place.street}
                        <br />
                        {place.post}
                        <br />
                        {place.town}
                        <br />
                        {place.district}
                        <br />
                        {place.state}
                        <br />
                        {place.pincode}
                        <br />
                      </td>
                    ))}
                    <td class="px-6 py-4">{obj.adhar}</td>
                    <td
                      class="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 cursor-pointer"
                      onClick={() => salarypageNavigation(obj?._id)}
                    >
                      View
                    </td>
                    <td
                      class="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 cursor-pointer"
                      onClick={() =>
                        handleAttendanceButton(
                          obj?._id,
                          obj?.name,
                          obj?.phone,
                          obj?.photo
                        )
                      }
                    >
                      View
                    </td>
                    <td
                      class="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 cursor-pointer"
                      onClick={() => nav(obj?._id)}
                    >
                      View
                    </td>
                    <td class="px-6 py-4 font-medium cursor-pointer">
      
                      <EditIcon
                        onClick={() => {
                          handleEdit(obj);
                        }}
                        className="text-yellow-600"
                      />
                      
                      <DeleteIcon
                        onClick={() => {
                          handleDeleteLabour(obj?._id);
                        }}
                        className="text-red-600 ms-6"
                      />  
                     
                     
                      
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colspan="8" class="text-center py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
           {/* Pagination */}
           <div className="flex justify-center mt-4">
        <button
          className="mx-2 px-3 py-1 bg-gray-200 text-gray-500 rounded"
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <KeyboardArrowLeft/>
        </button>
        <span>{currentPage} of {totalPages}</span>
        <button
          className="mx-2 px-3 py-1 bg-gray-200 text-gray-500 rounded"
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <KeyboardArrowRight/>
        </button>
      </div>
    </>
  );
}

export default Labour;
