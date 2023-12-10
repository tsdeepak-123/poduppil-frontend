import React, { useEffect, useState } from "react";
import { axiosUser } from "../../../../Api/Api";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import SwalMessage from "../../../../utils/SwalMessage";

function Owner() {
  const [OwnerData, setOwnerData] = useState();

  const fetchData = async () => {
    try {
      const response = await axiosUser.get("findowner");
      setOwnerData([response?.data?.allOwnerData]);
    } catch (error) {
      if (error?.response && error?.response?.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  const handleBlockOwner = async (id) => {
    try {
      SwalMessage(`blockowner?id=${id}`, "owner", "block");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  const handleUnBlockOwner = async (id) => {
    try {
      SwalMessage(`unblockowner?id=${id}`, "owner", "Unblock");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  const handleDeleteOwner = async (id) => {
    try {
      SwalMessage(`deleteowner?id=${id}`, "owner", "delete");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [OwnerData]);

  return (
    <>
      <div className="flex justify-center mt-8">
        <div class="relative overflow-y-scroll  overflow-x-auto shadow-md sm:rounded-lg max-h-[500px]">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Owner name
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
              {OwnerData && OwnerData[0]?.length > 0 ? (
                OwnerData[0]?.map((item, index) => (
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
                      onClick={() => handleDeleteOwner(item._id)}
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
                          onClick={() => handleBlockOwner(item._id)}
                          style={{ backgroundColor: "green" }}
                        >
                          <CheckCircleIcon />
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() => handleUnBlockOwner(item._id)}
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

export default Owner;
