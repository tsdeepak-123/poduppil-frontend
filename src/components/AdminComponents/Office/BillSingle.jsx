import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import { axiosAdmin } from "../../../Api/Api";
import { useState } from "react";
import Buttons from "../../CommonComponents/Button/Buttons";
import Swal from "sweetalert2";
import CommonCard from "../../CommonComponents/CommonCard/CommonCard"
import FormatDate from "../../../utils/FormatDate"

function BillSingle() {
  const navigate=useNavigate()
  const location = useLocation();
  const [billData, setBillData] = useState(null);
  const id = location?.state?.id;

  // Fetching data from backend
  const fetchData = async () => {
    try {
      const response = await axiosAdmin.get(`billsingle?id=${id}`);
      setBillData(response?.data?.billData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login")
      }
    }
  };

  const handlePaidBills = async () => {
    try {
      Swal.fire({
        title: "Is the bill paid ?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, paid!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosAdmin.post(`paidbills?id=${id}`);
          Swal.fire("bill paid", "The bill is added to paid bills", "success");
          navigate("/admin/paidbills")
        }
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login")
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <ReturnButton />

      {billData &&
        billData?.map((data, index) => (
          <div
            key={index}
            className="max-w-4xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-lg"
          >
            <h2 className="flex justify-center text-2xl font-bold mb-8 uppercase">{data.name}</h2>
            <div className="flex justify-center">
              <div>
                <img
                  src={data.photo}
                  alt="Project Image 1"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <CommonCard value={FormatDate(data.date)} label="Bill date"/>
            <CommonCard value={data.amount} label="Bill amount"/>
            <CommonCard value={data.status} label="Bill status"/>
            <CommonCard value={data.paid} label=" paid"/>
            <CommonCard value={data.pending} label="pending"/>
            <CommonCard value={data.paidby} label="Bill paid by"/>
            <CommonCard value={data.payment} label="payment type"/>
            </div>
            {
              data.isPaid==false ?
              <div className="flex justify-end">
                <Buttons name="Bill Paid" click={handlePaidBills} />
              </div>:""
            }
          </div>
        ))}
    </>
  );
}

export default BillSingle;
