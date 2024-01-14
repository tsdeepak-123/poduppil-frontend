import React, { useEffect, useState } from "react";
import { axiosAdmin } from "../../../Api/Api";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import { useLocation } from "react-router-dom";
import moment from "moment";
import Nodata from "../../CommonComponents/Nodata/Nodata";
import Loading from "../../CommonComponents/Loading/Loading";
import AttendanceEdit from "../Attendance/AttendanceEdit";
import Footer from "../../AdminComponents/Footer/Footer";

function AttendanceSingleView() {
  const location = useLocation();
  const id = location?.state?.id;
  const name = location?.state?.LabourName;
  const photo = location?.state?.photo;
  const phone = location?.state?.phone;
  const currentDate = new Date();
  const [data, setData] = useState();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentMonth, 1);
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentMonth + 1,
    0
  );

  const dates = [];

  for (
    let date = firstDayOfMonth;
    date <= lastDayOfMonth;
    date.setDate(date.getDate() + 1)
  ) {
    dates.push(new Date(date));
  }

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(
        `labourattendanceById?labourId=${id}`
      );
      setData(response?.data?.laborData);
      if (response?.data?.laborData) {
        const firstDataDate = Object.keys(response.data.laborData)[0];
        const month = new Date(firstDataDate).getMonth();
        setCurrentMonth(month);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getColorClass = (status) => {
    switch (status) {
      case "present":
        return "bg-green-500";
      case "halfday":
        return "bg-yellow-500";
      case "absent":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <ReturnButton />
      {!data ? (
        <Loading />
      ) : dates.length > 0 ? (
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4 md:mt-10">
            <div className="text-center">
              <img
                src={photo}
                alt="Labor Photo"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-semibold">{name}</h2>
              <p>{phone}</p>
            </div>
            <div className="flex justify-end mt-4 md:mt-0">
              <AttendanceEdit photo={photo} name={name} id={id} />
            </div>
          </div>
          <div className="md:w-1/2 p-4">
            {data && (
              <div className="calendar mx-auto max-w-lg">
                <div className="text-center font-semibold mb-4">
                  {monthNames[currentMonth]} {currentDate.getFullYear()}
                </div>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <div key={day} className="font-semibold text-gray-700">
                        {day}
                      </div>
                    )
                  )}
                  {dates.map((date) => {
                    const dateString = `${date.getFullYear()}-${(
                      date.getMonth() +
                      1 +
                      ""
                    ).padStart(2, "0")}-${(date.getDate() + "").padStart(
                      2,
                      "0"
                    )}`;
                    const status =
                      data && data[dateString] ? data[dateString] : "gray";
                    const className = getColorClass(status);

                    return (
                      <div
                        key={dateString}
                        className="w-12 h-12 flex items-center justify-center"
                        style={{
                          borderRadius: "50%",
                          border: "1px solid #ccc",
                        }}
                      >
                        <div
                          className={`w-10 h-10 ${className} rounded-full flex items-center justify-center`}
                        >
                          <span
                            className={
                              status === "absent" ? "text-white" : "text-black"
                            }
                          >
                            {date.getDate()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Nodata />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default AttendanceSingleView;
