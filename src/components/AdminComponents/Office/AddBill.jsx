import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextFields from "../../CommonComponents/TextFields/TextFields";
import Buttons from "../../CommonComponents/Button/Buttons";
import { axiosAdmin } from "../../../Api/Api";
import ReturnButton from "../../CommonComponents/Return/ReturnButton";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

function AddBill() {
  const [name, setName] = useState("");
  const [date, setDate] = useState();
  const [amount, setAmount] = useState();
  const [status, setStatus] = useState("");
  const [paid, setPaid] = useState();
  const [pending, setPending] = useState();
  const [paidby, setPaidBy] = useState("");
  const [payment, setPayment] = useState("");
  const [photo, setphoto] = useState(null);
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
    setphoto(file);
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
    formData.append("photo", photo); // Append the photo to the FormData

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
        }
        toast.error(response.data.message);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
        if (error.response && error.response.status === 401) {
          window.location.replace("/admin/login")
        }
        
      });
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ReturnButton />

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
              <Buttons click={formSubmit} name={loading ?"LOADING...":"ADD BILL"} classes={"sm:w-96"} />
            </div>
      </div>
    </>
  );
}

export default AddBill;
