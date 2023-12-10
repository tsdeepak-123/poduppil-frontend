import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosAdmin } from "../../../Api/Api";
import AddNav from "../../CommonComponents/AddNav/AddNav";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../../CommonComponents/Loading/Loading";

function StaffDisplay() {
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddStaffClick = () => {
    navigate("/admin/addstaff");
  };
  const salarypage = (id) => {
    navigate("/admin/staffsalary", { state: { id } });
  };
  const attendencePage = (id, phone, photo, name) => {
    navigate("/admin/staffattendencesingle", {
      state: { id, phone, photo, name },
    });
  };

  // fetching data from backend
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("staffslist");

      setStaffData(response?.data?.allStaffData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  const filteredstaffData = staffData?.filter((obj) =>
    obj.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //data displaying when mounting
  useEffect(() => {
    fetchData();
  }, []);
  const nav = (id) => {
    navigate("/admin/staffprofile", { state: { id } });
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (staffData) => {
    navigate(`/admin/editstaff`, { state: { staffData } });
  };

  return (
    <>
      <AddNav
        name="+ ADD NEW STAFF"
        click={handleAddStaffClick}
        value={searchTerm}
        onChange={handleSearch}
      />
      {!filteredstaffData ? (
        <Loading />
      ) : (
        <div class="relative overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg mt-11 ms-6 me-6 max-h-[500px]">
          <table class="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Staff name
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
                  Aadhar number
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredstaffData && filteredstaffData.length > 0 ? (
                filteredstaffData.map((obj) => (
                  <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
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
                      onClick={() => salarypage(obj._id)}
                    >
                      View
                    </td>
                    <td
                      class="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 cursor-pointer"
                      onClick={() =>
                        attendencePage(obj._id, obj.name, obj.photo, obj.phone)
                      }
                    >
                      View
                    </td>
                    <td
                      class="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 cursor-pointer"
                      onClick={() => nav(obj._id)}
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
    </>
  );
}

export default StaffDisplay;
