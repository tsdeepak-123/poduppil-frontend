import React, { useEffect, useState } from "react";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import { useLocation, useNavigate } from "react-router-dom";
import Buttons from "../../CommonComponents/Button/Buttons";
import { axiosAdmin } from "../../../Api/Api";
import AttendanceDisplay from "../Labour/AttendanceDisplay";
import AttendanceBar from "../Attendance/AttendanceBar";
import Nodata from "../../CommonComponents/Nodata/Nodata";
import Loading from "../../CommonComponents/Loading/Loading";
import moment from "moment"
import toast,{Toaster} from "react-hot-toast"

function StaffAttendanceSheet() {
  const [selectedValues, setSelectedValues] = useState({});
  const [staffData, setStaffdata] = useState([]);
  const [attendanceData, SetAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("staffslist");
      setStaffdata(response?.data?.allStaffData);
    } catch (error) {
      handleAPIError(error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await axiosAdmin.get("staffattendancelist");
      SetAttendanceData(response?.data?.StaffAttendance);
    } catch (error) {
      handleAPIError(error);
    }
  };

  const handleAPIError = (error) => {
    if (error.response && error.response.status === 401) {
      window.location.replace("/admin/login");
    }
  };

  useEffect(() => {
    fetchData();
    fetchAttendance();
  }, []);

  const handleAddStaff = () => {
    navigate("/admin/addstaff");
  };

  const handleRadioButtonChange = (event, id) => {
    const { value } = event.target;
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [id]: value,
    }));
  };

  useEffect(() => {
    const initialValues = {};
    staffData?.forEach((item) => {
      initialValues[item._id] = "absent";
    });
    setSelectedValues(initialValues);
  }, [staffData]);

  
  const updateAttendance = async () => {
    try {
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      const response = await axiosAdmin.post("staffattendance", { selectedValues, date: formattedDate });
  
      if (response.data.success) {
        toast.success("Attendance updated successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(response.data.message,{autoClose:3000});
      }
    } catch (error) {
      handleAPIError(error);
    }
  };

  useEffect(() => {
    const results = staffData?.filter((staff) =>
    staff.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
    setSearchResults(results);
  }, [searchTerm, staffData]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
    <Toaster position="top-center" reverseOrder={false}  />
      <ReturnButton navigation={"/admin/officedetails"}/>
      <AttendanceBar click={handleAddStaff} name="+ ADD NEW STAFF"  value={searchTerm} onChange={handleSearch} datePicker={true} // Set this prop to enable date picker
        selectedDate={selectedDate}
        onDateChange={setSelectedDate} />

      {searchResults?.length === 0 ? (
        <Nodata />
      ) :
      //  attendanceData ? (
      //   <AttendanceDisplay attendanceData={attendanceData} />
      // ): 
       (
        !searchResults ? (
<Loading/>
        ):(
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults?.map((item) => (
            <div key={item._id} className="rounded-lg shadow-md p-3">
              <img className="w-16 h-16 rounded-full mx-auto mb-2" src={item.photo} alt="labour photo" />
              <p className="text-sm font-semibold text-center mb-1">{item.name}</p>
              <div className="flex justify-around">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name={`attendance_${item._id}`}
                    value="present"
                    checked={selectedValues[item._id] === "present"}
                    onChange={(event) => handleRadioButtonChange(event, item._id)}
                    className="hidden"
                  />
                  <span className={`text-xs font-medium ${selectedValues[item._id] === "present" ? 'text-blue-500' : 'text-gray-500'}`}>Present</span>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name={`attendance_${item._id}`}
                    value="halfday"
                    checked={selectedValues[item._id] === "halfday"}
                    onChange={(event) => handleRadioButtonChange(event, item._id)}
                    className="hidden"
                  />
                  <span className={`text-xs font-medium ${selectedValues[item._id] === "halfday" ? 'text-blue-500' : 'text-gray-500'}`}>Half Day</span>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name={`attendance_${item._id}`}
                    value="absent"
                    checked={selectedValues[item._id] === "absent"}
                    onChange={(event) => handleRadioButtonChange(event, item._id)}
                    className="hidden"
                  />
                  <span className={`text-xs font-medium ${selectedValues[item._id] === "absent" ? 'text-blue-500' : 'text-gray-500'}`}>Absent</span>
                </label>
              </div>
            </div>
          ))}
            <div className="justify-center items-center flex  mb-10">
            <Buttons
              type="submit"
              name="SUBMIT"
              classes={"sm:w-48"}
              click={updateAttendance}
            />
          </div>
        </div>
        )
       
      )}

       
     
    </>
  );
}

export default StaffAttendanceSheet;