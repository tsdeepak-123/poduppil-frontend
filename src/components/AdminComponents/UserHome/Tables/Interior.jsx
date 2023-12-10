import React, { useEffect, useState } from "react";
import { axiosUser } from "../../../../Api/Api";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";
import SwalMessage from "../../../../utils/SwalMessage";

function Interior() {
  const [InteriorData, setInteriorData] = useState();

  const fetchData = async () => {
    try {
      const response = await axiosUser.get("findinterior");
      setInteriorData([response?.data?.allInteriorData]);
    } catch (error) {
      if (error?.response && error?.response?.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  const handleBlockInterior = async (id) => {
    try {
      SwalMessage(`blockinterior?id=${id}`, "interior", "Block");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  const handleUnBlockInterior = async (id) => {
    try {
      SwalMessage(`unblockinterior?id=${id}`, "interior", "Unblock");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  const handleDeleteInterior = async (id) => {
    try {
      SwalMessage(`deleteinterior?id=${id}`, "interior", "Delete");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [InteriorData]);

  return (
    <>
      <div className="flex justify-center mt-8">
        <div class="relative overflow-y-scroll  overflow-x-auto shadow-md sm:rounded-lg max-h-[500px]">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Interior name
                </th>
                <th scope="col" class="px-6 py-3">
                  photo
                </th>
                <th scope="col" class="px-6 py-3">
                  Delete
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {InteriorData && InteriorData[0]?.length > 0 ? (
                InteriorData[0]?.map((item, index) => (
                  <tr
                    key={index}
                    class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </td>
                    <td
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        src={item.photo}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full"
                      />
                    </td>
                    <td
                      scope="row"
                      class="px-6 py-4 font-medium text-red-500 cursor-pointer"
                      onClick={() => handleDeleteInterior(item._id)}
                    >
                      <DeleteIcon />
                    </td>
                    <td
                      scope="row"
                      class="px-6 py-4 font-medium  cursor-pointer"
                    >
                      {item.IsBlocked === false ? (
                        <Button
                          variant="contained"
                          onClick={() => handleBlockInterior(item._id)}
                          style={{ backgroundColor: "green" }}
                        >
                          <CheckCircleIcon />
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() => handleUnBlockInterior(item._id)}
                          style={{ backgroundColor: "red" }}
                        >
                          <BlockIcon />
                        </Button>
                      )}
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
      </div>
    </>
  );
}

export default Interior;
