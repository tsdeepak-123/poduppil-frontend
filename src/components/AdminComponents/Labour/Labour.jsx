import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosAdmin } from "../../../Api/Api";
import AddNav from "../../CommonComponents/AddNav/AddNav";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../../CommonComponents/Loading/Loading";

function Labour() {
  const navigate = useNavigate();
  const [labourData, setLabourData] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddLabourClick = () => {
    navigate("/admin/addlabour");
  };

  // fetching data from backend
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("labourslist");
      setLabourData(response.data.allLabourData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredLabourData = labourData?.filter((obj) =>
    obj.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //data displayin when mounting
  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <>
      <AddNav
        name="+ ADD NEW LABOUR"
        click={handleAddLabourClick}
        value={searchTerm}
        onChange={handleSearch}
      />
      {!filteredLabourData ? (
        <Loading />
      ) : (
        <div class="relative overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg mt-11 ms-6 me-6 max-h-[500px]">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
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
              {filteredLabourData && filteredLabourData.length > 0 ? (
                filteredLabourData.map((obj) => (
                  <tr
                    key={obj._id}
                    class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                  >
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

export default Labour;
