import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { axiosAdmin } from "../../../Api/Api";
import { useLocation } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast"

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "40px",
  width: 400,
  bgcolor: "#FFFFFF", // Use a light color for background
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)", // Adjust box shadow
  p: 4,
};

function PhotoAddModal({ projectId }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]); // State to store multiple photos

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePhotoChange = (event) => {
    const selectedPhotos = event.target.files;
    setPhotos(selectedPhotos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
  

    const formData = new FormData();
    for (let i = 0; i < photos.length; i++) {
      formData.append("photos", photos[i]);
    }
  
    try {
      const response = await axiosAdmin.post(
        `addprojectphotos?projectId=${projectId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false)
      if (typeof handleClose === 'function') {
        handleClose();
      }
      window.location.reload();
  
      if (response && response.data && response.data.success) {
        toast.success("Photo uploaded successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login");
      }
      setLoading(false)
    }
  };
  

  return (
    <>
    <Toaster position="top-center" reverseOrder={false} autoClose={5000}/>
      <Button onClick={handleOpen} variant="contained" color="success">
        ADD PROJECT PHOTO
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h5" mb={2} mx={10}>
            Select photos
          </Typography>
          <div className="mb-4">
            <TextField
              type="file"
              inputProps={{ multiple: true }} 
              fullWidth
              onChange={handlePhotoChange}
            />
          </div>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleSubmit}
          >
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default PhotoAddModal;
