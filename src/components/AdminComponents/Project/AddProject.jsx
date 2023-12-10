import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextFields from "../../CommonComponents/TextFields/TextFields";
import Buttons from "../../CommonComponents/Button/Buttons";
import { axiosAdmin } from "../../../Api/Api";
import ReturnButton from '../../CommonComponents/Return/ReturnButton';
import toast, { Toaster } from 'react-hot-toast';
 import Swal from 'sweetalert2'



function AddProject() {
  const navigate = useNavigate();

  // Initialize state with default values from projectData 
  const location = useLocation();
  const { projectData } = location.state || {};

  const formattedDate = projectData?.date ? new Date(projectData.date).toISOString().split('T')[0] : "";
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(projectData?.name || "");
  const [date, setDate] = useState(formattedDate || "");
  const [status, setStatus] = useState(projectData?.status || "");
  const [upnext, setUpNext] = useState(projectData?.upnext || "");
  const [pending, setPending] = useState(projectData?.pending || "");
  const [notes, setNotes] = useState(projectData?.notes || "");
  const [projectnumber, setProjectNumber] = useState(projectData?.projectnumber || "");
  const [supervisorname, setSuperVisorName] = useState(projectData?.supervisorname || "");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleUpnextChange = (e) => {
    setUpNext(e.target.value);
  };
  const handlePendingChange = (e) => {
    setPending(e.target.value);
  };
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };
  const handleSupervisorNameChange = (e) => {
    setSuperVisorName(e.target.value);
  };
  const handleProjectNumberChange = (e) => {
    setProjectNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    if (projectData) {
      //update operation with the edited values
      axiosAdmin
        .patch(`editproject/${projectData._id}`, {
          name,
          date,
          status,
          upnext,
          pending,
          notes,
          supervisorname,
          projectnumber,
        })
        .then((response) => {
          navigate("/admin/projectdetails");
          Swal.fire('Project updated successfully')
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            window.location.replace("/admin/login")
          }
        });
    } else {
      //  add operation with the new Project Data
      axiosAdmin
        .post("addproject", {
          projectnumber,
          name,
          date,
          status,
          upnext,
          pending,
          notes,
          supervisorname,
        })
        .then((response) => {
          setLoading(false)
          if(response?.data?.success){
            navigate("/admin/projectdetails");
            Swal.fire('Project added successfully')
          } 
          toast.error(response?.data?.messege)
        })
        .catch((error) => {  
          if (error.response && error.response.status === 401) {
            window.location.replace("/admin/login");
          }
          setLoading(false)
          toast.error(error?.response?.data?.messege)
        });
    }
  };

    return (
    <>
    <Toaster  position="top-center" reverseOrder={false}/>
<ReturnButton/>
         <div className="flex flex-wrap justify-around px-16 mt-24">
          <TextFields
            name="Number"
            type="text"
            value={projectnumber}
            onChange={handleProjectNumberChange}
          />
          <TextFields
            name="Project name"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
          <TextFields
            name="Starting Date"
            type="date"
            input={true}
            value={date}
            onChange={handleDateChange}
          />
          <TextFields
            name="Status"
            type="text"
            value={status}
            onChange={handleStatusChange}
          />
          <TextFields
            name="Up next"
            type="text"
            value={upnext}
            onChange={handleUpnextChange}
          />
          <TextFields
            name="Pending"
            type="text"
            value={pending}
            onChange={handlePendingChange}
          />
          <TextFields
            name="Supervisor name"
            type="text"
            value={supervisorname}
            onChange={handleSupervisorNameChange}
          />
          <TextFields
            name="Notes"
            type="text"
            value={notes}
            onChange={handleNotesChange}
          />
         <div className="w-[400px]"></div>
      </div>
      <div className="flex justify-center mt-9 gap-2">
      <Buttons name={loading ?"LOADING..." : projectData ? "UPDATE" : "ADD PROJECT"} classes={"sm:w-80"} click={handleSubmit} />
      </div>
     
    </>
  );
}

export default AddProject;