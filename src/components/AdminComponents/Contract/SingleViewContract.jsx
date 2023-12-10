import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosAdmin } from "../../../Api/Api";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import Buttons from "../../CommonComponents/Button/Buttons";
import Swal from "sweetalert2";
import FormatDate from "../../../utils/FormatDate";
import CommonCard from "../../CommonComponents/CommonCard/CommonCard";
import WorkerModal from "../../AdminComponents/Contract/WorkerModal";
import LabourCount from "../../AdminComponents/Contract/LabourCount";
import Loading from "../../CommonComponents/Loading/Loading";

const SingleViewContract = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [contractData, setContractData] = useState({});
  const id = location?.state?.id;

  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`ContractById?id=${id}`);
      setContractData(response?.data?.FindContract);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  const handleCompletedContracts = async () => {
    try {
      Swal.fire({
        title: "Is the contract completed?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, completed!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosAdmin.post(`completedcontracts?id=${id}`);
          Swal.fire(
            "Work completed",
            "The contract is added to completed contract",
            "success"
          ).then(() => {
            navigate("/admin/completedcontracts");
          });
        }
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, contractData]);

  return (
    <>
      <ReturnButton />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 flex justify-center">
          Contract Work Details
        </h1>
      </div>

      {!contractData ? (
        <Loading />
      ) : (
        <>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            <CommonCard
              value={contractData?.projectname}
              label="Project Name"
            />
            <CommonCard
              value={contractData?.Contractwork}
              label="Contract Work Name"
            />
            <CommonCard
              value={contractData?.Contractorname}
              label="Contractor Name"
            />
            <CommonCard value={contractData?.Amount} label="Contract Amount" />
            <CommonCard
              value={contractData?.status}
              label="Contract Work Status"
            />
            <CommonCard
              value={contractData?.totallabour}
              label="Main Labours"
            />
            <CommonCard value={contractData?.totalhelper} label="Helpers" />
            <CommonCard
              value={`+91 ${contractData?.phone}`}
              label="Contractor Phone Number"
            />
            <CommonCard
              value={FormatDate(contractData?.date)}
              label="Started Date"
            />
          </div>
          {!contractData?.isCompleted && (
            <div className="flex justify-center gap-4 mt-8">
              <Buttons name="WORK COMPLETED" click={handleCompletedContracts} />
              <WorkerModal projectId={contractData?._id} />
            </div>
          )}
          <div>
            <p className="flex flex-wrap justify-center mt-14 font-serif font-bold text-[30px]">
              Dates and Labour count
            </p>
          </div>
          <LabourCount contractId={id} />
        </>
      )}
    </>
  );
};

export default SingleViewContract;
