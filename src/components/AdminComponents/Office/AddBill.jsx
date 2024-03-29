import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextFields from "../../CommonComponents/TextFields/TextFields";
import Buttons from "../../CommonComponents/Button/Buttons";
import { axiosAdmin } from "../../../Api/Api";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

function AddBill() {

// Initialize state with default values from projectData 
const location = useLocation();
const { BillData } = location.state || {};
 
console.log("bill dataaa",BillData);

const [name, setName] = useState(BillData?.name || "");
const [date, setDate] = useState(BillData?.date || "");
const [amount, setAmount] = useState(BillData?.amount || "");
const [status, setStatus] = useState(BillData?.status || "");
const [paid, setPaid] = useState(BillData?.paid || "");
const [pending, setPending] = useState(BillData?.pending || "");
const [paidby, setPaidBy] = useState(BillData?.paidby || "");
const [payment, setPayment] = useState(BillData?.payment || "");
const [photo, setPhoto] = useState(BillData?.photo || null);
const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBillNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handlePaidChange = (e) => {
    setPaid(e.target.value);
  };
  const handlePendingChange = (e) => {
    setPending(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handlePaidByChange = (e) => {
    setPaidBy(e.target.value);
  };
  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };
  const handlephotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("date", date);
    formData.append("amount", amount);
    formData.append("status", status);
    formData.append("paid", paid);
    formData.append("pending", pending);
    formData.append("paidby", paidby);
    formData.append("payment", payment);
    formData.append("photo", photo);
  
    if (BillData) {
      // If BillData exists, it's an edit operation
      axiosAdmin
        .patch(`editbill/${BillData._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setLoading(false);
          if (response.data.success) {
            navigate("/admin/utilitybills");
            Swal.fire("Bill edited successfully");
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response ? error.response.data.message : "An error occurred");
          if (error.response && error.response.status === 401) {
            window.location.replace("/admin/login");
          }
        });
    } else {
      // If BillData doesn't exist, it's an add operation
      axiosAdmin
        .post("addbills", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setLoading(false);
          if (response.data.success) {
            navigate("/admin/utilitybills");
            Swal.fire("Bill added successfully");
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response ? error.response.data.message : "An error occurred");
          if (error.response && error.response.status === 401) {
            window.location.replace("/admin/login");
          }
        });
    }
  };
  

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ReturnButton navigation={"/admin/utilitybills"}/>

      <div className="flex flex-wrap justify-around px-16 mt-24 ">
        <TextFields
          name="Bill name"
          type="text"
          value={name}
          onChange={handleBillNameChange}
        />
        <TextFields
          name="Date of Bill"
          type="date"
          input={true}
          value={date}
          onChange={handleDateChange}
        />
        <TextFields
          name="Bill amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />
        <TextFields
          name="Status"
          type="text"
          value={status}
          onChange={handleStatusChange}
        />
        <TextFields
          name="Paid"
          type="number"
          value={paid}
          onChange={handlePaidChange}
        />
        <TextFields
          name="Pending"
          type="number"
          value={pending}
          onChange={handlePendingChange}
        />
        <TextFields
          name="Paid by"
          type="text"
          value={paidby}
          onChange={handlePaidByChange}
        />
        <TextFields
          name="Payment type"
          type="text"
          value={payment}
          onChange={handlePaymentChange}
        />
        <TextFields
          name="photo"
          type="file"
          input={true}
          onChange={handlephotoChange}
        />
        
            <div className="mx-auto mt-11">
              <Buttons click={formSubmit} name={loading ?"LOADING...":BillData ? "UPDATE" : "ADD BILL"} classes={"sm:w-96"} />
            </div>
      </div>
    </>
  );
}

export default AddBill;
