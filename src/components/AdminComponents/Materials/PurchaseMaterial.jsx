import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import Dropdown from "../../CommonComponents/Dropdown/Dropdown";
import { axiosAdmin } from "../../../Api/Api";
import TextFields from "../../CommonComponents/TextFields/TextFields";
import Nodata from "../../CommonComponents/Nodata/Nodata";
import Footer from "../Footer/Footer";
import Materials from "./Materials";
import { FaArrowRight } from "react-icons/fa";
import Button from "@mui/material/Button";

function PurchaseMaterial() {
  const location = useLocation();
  const navigate = useNavigate();
  const [projectname, setProjectName] = useState("");
  const [projectData, setProjectData] = useState("");
  const [date, setDate] = useState();

  const handleDataReceived = (projectname) => {
    setProjectName(projectname);
  };

  const handleDatechange = (e) => {
    setDate(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get("allprojects?status=false");
      setProjectData(response?.data?.FindProject);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const hadlePurchase = () => {
    navigate('/admin/materialpurchase', { state: { projectname, date } });
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <ReturnButton navigation={"/admin/projectlist"} />
      </div>
      <div className="mt-14">
        {projectData && projectData.length > 0 ? (
          <div>
            <p className="text-sm text-red-500 flex justify-center">
              Please select a project and a purchase date to continue.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <TextFields
                name="Purchase date"
                type="date"
                input={true}
                onChange={handleDatechange}
              />
              <Dropdown
                projects={projectData}
                onDataPassed={handleDataReceived}
              />
              {
                projectname && date ?
                <Button variant="contained" className="w-44 h-14"  style={{ backgroundColor: 'green', color: 'white' }} onClick={hadlePurchase} endIcon={<FaArrowRight />}>
                Purchase
              </Button>:""
              }
            
            </div>
          </div>
        ) : (
          <Nodata />
        )}
      </div>
      <div className="mb-14 mt-14">
        <h1 className="flex justify-center text-3xl uppercase">
          All Materials
        </h1>
        <div className="mt-8">
        <Materials />
        </div>
       
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default PurchaseMaterial;
