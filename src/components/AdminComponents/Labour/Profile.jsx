import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosAdmin } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import FormatDate from "../../../utils/FormatDate";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import AttendanceEdit from "../Attendance/AttendanceEdit";
import Loading from "../../CommonComponents/Loading/Loading";
import EditIcon from '@mui/icons-material/Edit';

function Profile() {
  const navigate = useNavigate();
  const [LabourData, setLabourData] = useState();
  const location = useLocation();
  const id = location?.state?.id;
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(
        `labourbyid?id=${location?.state?.id}`
      );

      setLabourData(response?.data?.LabourData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  //data displayin when mounting
  useEffect(() => {
    fetchData();
  }, []);

  const nav = (id) => {
    navigate("/admin/viewprofile", { state: { id } });
  };
  return (
    <>
      <ReturnButton navigation={"/admin/labourdetails"}/>
      <>
      {
        !LabourData ?(
        <Loading/>
        ):(
          <div class="container mx-auto my-5 p-5">
          <div class="md:flex no-wrap md:-mx-2">
            <div class="w-full mx-2">
              <div class="bg-white p-3 shadow-sm rounded-sm">
                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      class="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span class="tracking-wide">About</span>
                </div>
                <div class="text-gray-700">
                  <div class="md:flex no-wrap md:-mx-2">
                    <div class="w-full md:w-3/12 md:mx-2">
                      <div class="image overflow-hidden py-4 px-6">
                        <img
                          class="h-auto w-full mx-auto rounded-lg"
                          src={LabourData?.photo}
                          alt="photo"
                        />
                      </div>
                      
                    </div>
                    <div class="w-full md:w-9/12 md:mx-2">
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">First Name</div>
                        <div class="px-4 py-2">{LabourData?.name}</div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Age</div>
                        <div class="px-4 py-2">{LabourData?.age}</div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Contact No.</div>
                        <div class="px-4 py-2">{LabourData?.phone}</div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold"> Address</div>
                        <div class="px-4 py-2">
                          {LabourData?.address[0]?.street},
                          {LabourData?.address[0]?.town},
                          {LabourData?.address[0]?.post},
                          {LabourData?.address[0]?.district},
                          {LabourData?.address[0]?.pincode}
                        </div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Basic Salary</div>
                        <div class="px-4 py-2">{LabourData?.salary}</div>
                      </div>
                      <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold">Date of Joing</div>
                        <div class="px-4 py-2">
                          {FormatDate(LabourData?.date)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      class="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                  </span>
                  <span class="tracking-wide">Aadhar</span>
                </div>

                <div class="md:flex no-wrap md:-mx-2">
                  <div class="w-full md:w-6/12 md:mx-2">
                    <div class="image overflow-hidden py-3 px-3">
                      <img
                        class="h-[250px] w-[500px] mx-auto rounded-lg"
                        src={LabourData?.IdProof[0]}
                        alt="proof1"
                      />
                    </div>
                  </div>
                  <div class="w-full md:w-6/12 md:mx-2">
                    <div class="image overflow-hidden py-3 px-3">
                      <img
                        class="h-[250px] w-[500px] mx-auto rounded-lg"
                        src={LabourData?.IdProof[1]}
                        alt="proof2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )

      }
    
      </>
    </>
  );
}

export default Profile;
