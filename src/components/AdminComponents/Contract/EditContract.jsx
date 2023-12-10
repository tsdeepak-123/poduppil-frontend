import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextFields from "../../CommonComponents/TextFields/TextFields";
import Buttons from "../../CommonComponents/Button/Buttons";
import { axiosAdmin } from "../../../Api/Api";
import Dropdown from "../../../components/CommonComponents/Dropdown/Dropdown";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";

function EditContract() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.data._id;

  const [projectname, setProjectName] = useState("");
  const [Contractwork, setContractwork] = useState("");
  const [Contractorname, setContractorname] = useState("");
  const [totallabour, settotallabour] = useState(0);
  const [totalhelper, setTotalhelper] = useState(0);
  const [Details, setDetails] = useState("");
  const [status, setStatus] = useState("");
  const [Amount, setAmount] = useState(0);
  const [Paymentdetails, setPaymentdetails] = useState(0);
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [projectData, setProjectData] = useState("");

  useEffect(() => {
    const formattedDate = new Date(location?.state?.data?.date)
      .toISOString()
      .split("T")[0];
    setContractorname(location?.state?.data?.Contractorname);
    setProjectName(location?.state?.data?.projectname);
    setContractwork(location?.state?.data?.Contractwork);
    settotallabour(location?.state?.data?.totallabour);
    setTotalhelper(location?.state?.data?.totalhelper);
    setDetails(location?.state?.data?.Details);
    setStatus(location?.state?.data?.status);
    setAmount(location?.state?.data?.Amount);
    setPaymentdetails(location?.state?.data?.Paymentdetails);
    setPhone(location?.state?.data?.phone);
    setDate(formattedDate);
    setProjectData(location?.state?.data?.projectData);
  }, []);

  const handleDataReceived = (projectname) => {
    setProjectName(projectname);
  };
  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      axiosAdmin
        .post(`EditContract?id=${id}`, {
          projectname,
          Contractwork,
          totallabour,
          Contractorname,
          totalhelper,
          Details,
          phone,
          date,
          Paymentdetails,
          status,
          Amount,
        })
        .then((response) => {
          navigate("/admin/contractdetails");
        });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

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

  //data displayin when mounting
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ReturnButton />
      <div className="flex flex-wrap justify-around px-16 mt-24">
        <div className="ms-4 sm:mb-0 mb-4">
          <Dropdown projects={projectData} onDataPassed={handleDataReceived} />
        </div>

        <TextFields
          name="Contract work name"
          value={Contractwork}
          onChange={(e) => {
            setContractwork(e.target.value);
          }}
          type="text"
        />
        <TextFields
          name="Contractor name"
          value={Contractorname}
          onChange={(e) => {
            setContractorname(e.target.value);
          }}
          type="text"
        />
        <TextFields
          name="Contractor phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          type="number"
        />
        <TextFields
          name="Total main labours"
          value={totallabour}
          onChange={(e) => {
            settotallabour(e.target.value);
          }}
          type="number"
        />
        <TextFields
          name="Total helpers"
          value={totalhelper}
          onChange={(e) => {
            setTotalhelper(e.target.value);
          }}
          type="number"
        />
        <TextFields
          name="Other details"
          value={Details}
          onChange={(e) => {
            setDetails(e.target.value);
          }}
          type="text"
        />
        <TextFields
          name="Work status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
          type="text"
        />
        <TextFields
          name="Contraction Amount"
          value={Amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          type="text"
        />
        <TextFields
          name="Payment details"
          value={Paymentdetails}
          onChange={(e) => {
            setPaymentdetails(e.target.value);
          }}
          type="text"
        />
        <TextFields
          name="date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          input={true}
        />
        <div className="flex justify-center mt-3">
          <Buttons
            name="EDIT CONTRACT"
            classes={"sm:w-96"}
            click={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}

export default EditContract;
