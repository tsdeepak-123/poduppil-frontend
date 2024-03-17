import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddNav from "../../CommonComponents/AddNav/AddNav";
import { axiosAdmin } from "../../../Api/Api";
import EditIcon from "@mui/icons-material/Edit";
import Buttons from "../../CommonComponents/Button/Buttons";
import Loading from "../../CommonComponents/Loading/Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import SwalMessage from "../../../utils/SwalMessage";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

function Project() {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axiosAdmin.get("projectList", {
        params: {
          status: false,
          page: currentPage,
          searchTerm: searchTerm,
        },
      });
      setProjectData(response.data.FindProject);
      setTotalPages(Math.ceil(response.data.totalCount / 10)); // Assuming 10 items per page
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentPage, searchTerm]); // Trigger fetch on page change or search term change

  const handleAddProjectClick = () => {
    navigate("/admin/addproject");
  };

  const handleCompletedProjects = () => {
    navigate("/admin/completedprojects");
  };

  const handleEdit = (projectData) => {
    navigate(`/admin/editproject`, { state: { projectData } });
  };

  const nav = (id, projectname) => {
    navigate("/admin/projectview", { state: { id, projectname } });
  };

  const handleDeleteProject = async (id) => {
    try {
      const admin = true;
      const status = await SwalMessage(`deleteproject?id=${id}`, "Project", "Delete", admin);
      if (status.success) {
        Swal.fire(`Project deleted successfully`, "", "success");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row">
        <div className="w-full mb-4 lg:mb-0">
          <AddNav
            name="+ ADD NEW PROJECT"
            click={handleAddProjectClick}
            value={searchTerm}
            onChange={handleSearch}
            navigation={"/admin/dashboard"}
            viewClick={handleCompletedProjects}
            twoButton={true}
            viewButtonName="COMPLETED PROJECTS"
          />
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projectData && projectData.length > 0 ? (
                projectData?.map((data) => {
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
                        <DeleteIcon
                          onClick={() => {
                            handleDeleteProject(data?._id);
                          }}
                          className="text-red-600 ms-6"
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
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          className="mx-2 px-3 py-1 bg-gray-200 text-gray-500 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <KeyboardArrowLeft/>
        </button>
        <span>{currentPage} of {totalPages}</span>
        <button
          className="mx-2 px-3 py-1 bg-gray-200 text-gray-500 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <KeyboardArrowRight/>
        </button>
      </div>
    </>
  );
}

export default Project;
