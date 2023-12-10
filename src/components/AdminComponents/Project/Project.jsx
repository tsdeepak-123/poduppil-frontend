import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddNav from "../../CommonComponents/AddNav/AddNav";
import { axiosAdmin } from "../../../Api/Api";
import EditIcon from "@mui/icons-material/Edit";
import Buttons from "../../CommonComponents/Button/Buttons";
import Loading from "../../CommonComponents/Loading/Loading";

function Project() {
  const navigate = useNavigate();
  const [ProjectData, setProjectData] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddProjectClick = () => {
    navigate("/admin/addproject");
  };
  const handleCompletedProjects = () => {
    navigate("/admin/completedprojects");
  };

  //editing project data

  const handleEdit = (projectData) => {
    navigate(`/admin/editproject`, { state: { projectData } });
  };

  // fetching data from backend
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("projectList?status=false");
      setProjectData(response?.data?.FindProject);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  //data displaying when mounting
  useEffect(() => {
    fetchData();
  }, []);

  const nav = (id, projectname) => {
    console.log("porr", projectname);
    navigate("/admin/projectview", { state: { id, projectname } });
  };

  const filteredProjectData = ProjectData?.filter((obj) =>
    obj.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
   <div className="w-full flex flex-col lg:flex-row">
  <div className="w-full lg:w-[80%] mb-4 lg:mb-0">
    <AddNav
      name="+ ADD NEW PROJECT"
      click={handleAddProjectClick}
      value={searchTerm}
      onChange={handleSearch}
    />
  </div>
  <div className="w-[100px] mx-56 sm:mx-0 sm:w-full lg:w-[20%] sm:mt-48">
    <Buttons name="COMPLETED PROJECT" click={handleCompletedProjects} />
  </div>
</div>

      {
        !filteredProjectData ?(
          <Loading/>
        ):(
          <div className="relative overflow-x-scroll overflow-y-scroll shadow-md sm:rounded-lg mt-11 ms-6 me-6 max-h-[500px]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Project number
                </th>
                <th scope="col" className="px-6 py-3">
                  Project name
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
  
                <th scope="col" className="px-6 py-3">
                  Details
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProjectData && filteredProjectData.length > 0 ? (
                filteredProjectData?.map((data) => {
                  return (
                    <tr
                      key={data?._id}
                      className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{data?.projectnumber}</td>
                      <td className="px-6 py-4">{data?.name}</td>
                      <td className="px-6 py-4">{data?.status}</td>
                      <td
                        className="px-6 py-4 text-blue-500 cursor-pointer"
                        onClick={() => nav(data?._id, data?.name)}
                      >
                        View
                      </td>
                      <td class="px-6 py-4 font-medium cursor-pointer">
                        <EditIcon
                          onClick={() => {
                            handleEdit(data);
                          }}
                          className="text-yellow-600"
                        />
                      </td>
                    </tr>
                  );
                })
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
        )
      }
      
    </>
  );
}

export default Project;
