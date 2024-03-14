import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { axiosAdmin } from '../../../Api/Api'
import moment from 'moment'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '40px',
  width: 400,
  bgcolor: '#FFFFFF', // Use a light color for background
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)', // Adjust box shadow
  p: 4,
};

function AdvancedModal({labourId,staffId}) {
  const [open, setOpen] = useState(false);
  const [amount, setAdvance] = useState()
  const [date, setDate] = useState()
   

  const handleAdvanceChange=(e)=>{
    setAdvance(e.target.value)
  }
  const handleAdvanceDate=(e)=>{
    setDate(e.target.value)
  }

  const handleSubmit=async(e)=>{
    try {
      // const formattedDate = moment(date).format("YYYY-MM-DD");
      // console.log(formattedDate);
      e.preventDefault()
      const id = labourId ? labourId : staffId;
      const endpoint = labourId ? 'labouradvance' : 'staffadvance'; 
     await axiosAdmin.post(`${endpoint}?id=${id}`,{amount,date})
  
     if (typeof handleClose === 'function') {
      handleClose();
    }
    window.location.reload();
    
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login")
      }
    }
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" color="success">
        SALARY ADVANCE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h5" mb={2} mx={10}>
            Salary Advance
          </Typography>
          <div className='mb-4'>
          <TextField label="Date" type="date" fullWidth InputLabelProps={{shrink:true}} value={date} onChange={handleAdvanceDate}/>
          </div>
          <div className='mb-4'>
          <TextField label="Advance" type="number" fullWidth value={amount} onChange={handleAdvanceChange}/>
          </div>
          <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default AdvancedModal;
