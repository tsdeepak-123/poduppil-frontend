import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { axiosAdmin, axiosUser } from '../../../../Api/Api'
import toast,{Toaster} from "react-hot-toast"

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '40px',
    width: 400,
    bgcolor: '#FFF', // Use a light color for background
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)', // Adjust box shadow
    p: 4,
  };
  

function AddOwnerPhoto() {
    const [open, setOpen] = useState(false);
    const [photo, setPhoto] = useState();
    const [name, setName] = useState('');
    const [loading,setLoading] = useState(false);

    const handlePhotoChange = (e) => {
      const file = e.target.files[0]
      setPhoto(file)
    };
  
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
  
    const handleSubmit = async (e) => {
      try {
        setPhoto("");
        setName("");
        setLoading(true)
        const response = await axiosUser.post("addowner",{photo,name}, {
          headers: {
            "Content-Type": "multipart/form-data",
          }  
            
        });
  
        if (response?.data?.success) {
          handleClose();
          toast.success("Owner photo added successfully");
        } else {
          toast.error(response?.data?.message);
          setLoading(false)
        }
  
      } catch (error) {
        setLoading(false)
        toast.error(error.response?.data.error);
        if (error.response && error.response.status === 401) {
          window.location.replace("/admin/login");
        }
      }
    };
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
  
  return (
    <>
    <Toaster position='top-center' reverseOrder={false}/>
      <Button onClick={handleOpen} variant="contained" className='h-8' color="success">
        ADD owner photo
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h5" mb={2} mx={8}>
            Add owner photo
          </Typography>
          <div className='mb-4'>
          <TextField InputLabelProps={{shrink:true}} label="SELECT IMAGE" type="file" fullWidth name="photo" onChange={handlePhotoChange}/>
          </div>
          <div className='mb-4'>
          <TextField label="PHOTO NAME" type="text" fullWidth value={name} onChange={handleNameChange}/>
          </div>
          <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>
          {loading? "loading...": "Submit"}
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default AddOwnerPhoto