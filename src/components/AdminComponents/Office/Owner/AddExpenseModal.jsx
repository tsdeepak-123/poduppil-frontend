import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { axiosAdmin } from '../../../../Api/Api'
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

function AddExpenseModal() {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState('');
  const [payment, setPayment] = useState('');
  const [date, setDate] = useState('');

  const handleItemChange = (e) => {
    setItem(e.target.value);
  };
  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(item,payment,date);
      await axiosAdmin.post('ownerexpense', {item, date ,payment});
      handleClose();
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.replace("/admin/login")
      }
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" color="success">
        OWNER EXPENSE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h5" mb={2} mx={10}>
            Owner Expense
          </Typography>
          <div className='mb-4'>
            <TextField label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={date} onChange={handleDateChange} />
          </div>
          <div className='mb-4'>
            <TextField label="Item" fullWidth value={item} onChange={handleItemChange} />
          </div>
          <div className='mb-4'>
            <TextField label="Payment" fullWidth value={payment} onChange={handlePaymentChange} />
          </div>
          <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default AddExpenseModal;
