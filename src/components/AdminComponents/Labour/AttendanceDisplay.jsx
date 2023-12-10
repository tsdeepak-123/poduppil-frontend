import React from "react";
import FormatDate from "../../../utils/FormatDate";
import Loading from "../../CommonComponents/Loading/Loading";

function AttendanceDisplay({ attendanceData }) {
  return (
    <>
    {
      attendanceData === null ?(
<Loading/>
      ):(
        <>
        <div className="flex justify-center mb-14 font-bold">
        Date &nbsp;&nbsp; : &nbsp;&nbsp;{FormatDate(attendanceData[0]?.date)}
      </div>
      <div className="flex justify-center ">
        <div class="w-[70%] relative overflow-y-scroll overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] ">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                 IMAGE
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((obj) =>
                obj?.records?.map((item) => (
                  <tr
                    key={item._id}
                    class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        src={
                          item?.laborerId
                            ? item?.laborerId?.photo
                            : item?.StaffId?.photo
                        }
                        alt="Jane Smith's image"
                        class="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item?.laborerId
                        ? item?.laborerId?.name
                        : item?.StaffId?.name}
                    </td>
                    <td
                      class={`px-6 py-4 font-medium ${
                        item.status === "present"
                          ? "text-green-600"
                          : item.status === "halfday"
                          ? "text-yellow-500"
                          : "text-red-600"
                      } cursor-pointer`}
                    >
                      {item.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )
    }

    </>
  );
}

export default AttendanceDisplay;
