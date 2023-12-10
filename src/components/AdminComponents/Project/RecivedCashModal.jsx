import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { axiosAdmin } from "../../../Api/Api";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "40px",
  width: 400,
  bgcolor: "#FFF", // Use a light color for background
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)", // Adjust box shadow
  p: 4,
};

function RecivedCashModal() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();
  const [payment, setPayment] = useState();
  const [amount, setAmount] = useState();
  const [projectData, setProjectData] = useState();
  const [projectId, setProjectId] = useState();

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };
  const handleProjectChange = (e) => {
    setProjectId(e.target.value);
  };

  //submission of modal

  const handleSubmit = async (e) => {
    try {
      setDate("");
      setAmount("");
      setPayment("");
      setProjectId("");
      const response = await axiosAdmin.patch(`handlepayment?id=${projectId}`, {
        date,
        payment,
        amount,
      });

      if (response.data.success) {
        handleClose();
        toast.success("Cash recieved successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //fetching data of projects

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

  //data displaying when mounting
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Button
        onClick={handleOpen}
        variant="contained"
        className="h-8"
        color="success"
      >
        RECIEVE CASH
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2} mx={10}>
            RECIEVE CASH
          </Typography>
          <div className="mb-4">
            {projectData && projectData.length > 0 ? (
              <Box>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    SELECT PROJECT
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={projectId}
                    label="SELECT PROJECT"
                    onChange={handleProjectChange}
                  >
                    {projectData.map((item) => (
                      <MenuItem value={item._id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ) : (
              <Box className="sm:w-[380px] w-80">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    No projects found
                  </InputLabel>
                  <Select
                    id="demo-simple-select"
                    label="SELECT PROJECT"
                  ></Select>
                </FormControl>
              </Box>
            )}
          </div>
          <div className="mb-4">
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={date}
              InputLabelProps={{ shrink: true }}
              onChange={handleDateChange}
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Amount"
              type="number"
              fullWidth
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Payment"
              type="text"
              fullWidth
              value={payment}
              onChange={handlePaymentChange}
            />
          </div>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default RecivedCashModal;
