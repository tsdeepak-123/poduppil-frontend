import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { axiosAdmin } from '../../../Api/Api'
import { useLocation } from 'react-router-dom';
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
  

function WorkerModal({projectId}) {
  const location=useLocation()
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState()
    const [mainLabour, setMainlabour] = useState()
    const [helpers, setHelper] = useState()
  
     
  
    const handleDateChange=(e)=>{
      setDate(e.target.value)
    }
    const handleMainLabourChange=(e)=>{
      setMainlabour(e.target.value)
    }
    const handleHelperChange=(e)=>{
      setHelper(e.target.value)
    }
  
    const handleSubmit=async(e)=>{
      try {
        setDate("")
        setHelper("")
        setMainlabour("")
        const response= await axiosAdmin.patch(`handleWorkerCount?id=${projectId}`,{date,mainLabour,helpers})
       
        if(response.data.success){
          handleClose()
          toast.success("Labour count added successfully")
        }else{
          toast.error(response.data.message)
        }
        
      } catch (error) {
        toast.error(error.response.data.message)
        if (error.response && error.response.status === 401) {
          window.location.replace("/admin/login")
        }
      }
    
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <>
    <Toaster position='top-center' reverseOrder={false}/>
      <Button onClick={handleOpen} variant="contained" className='h-8' color="success">
        EDIT LABOUR COUNT
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h5" mb={2} mx={12}>
            Labour count
          </Typography>
          <div className='mb-4'>
          <TextField label="Date" type="date" fullWidth value={date} InputLabelProps={{shrink:true}} onChange={handleDateChange}/>
          </div>
          <div className='mb-4'>
          <TextField label="Number of Main Labours" type="number" fullWidth value={mainLabour} onChange={handleMainLabourChange}/>
          </div>
          <div className='mb-4'>
          <TextField label="Number of helpers" type="number" fullWidth value={helpers} onChange={handleHelperChange}/>
          </div>
          <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default WorkerModal