import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { axiosAdmin } from '../../../Api/Api'
import { useLocation,useNavigate } from 'react-router-dom';
import toast,{Toaster} from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
import { AdminAction } from '../../../Stores/AdminAuth';

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
  

function PasswordChangeModal() {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [adminData, setAdminData] = useState({ email: '' }); // Initialize with an empty email
    const [email, setEmail] = useState(adminData.email);

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleLogout=()=>{
     dispatch(AdminAction.AdminLogout())
      navigate("/admin/login")
    }
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleCurrentPasswordChange = (e) => {
      setCurrentPassword(e.target.value);
    };
  
    const handleNewPasswordChange = (e) => {
      setNewPassword(e.target.value);
    };
  
    const fetchData = async () => {
      try {
        const response = await axiosAdmin.get("admindata");
        const fetchedAdminData = response?.data?.adminData;
        setAdminData(fetchedAdminData);
        setEmail(fetchedAdminData.email);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.replace("/admin/login");
        }
      }
    };
  
    const adminId = adminData._id;
  
    const handleSubmit = async (e) => {
      try {
        setCurrentPassword("");
        setNewPassword("");
        const response = await axiosAdmin.patch(`updateAdminData?id=${adminId}`, {
          email,
          newPassword,
          currentPassword
        });
  
        if (response?.data?.success) {
          handleClose();
          toast.success("Admin data updated successfully");
          handleLogout()
        } else {
          toast.error(response?.data?.message);
        }
  
      } catch (error) {
        toast.error(error?.response?.error?.message);
        if (error.response && error.response.status === 401) {
          window.location.replace("/admin/login");
        }
      }
    };
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    useEffect(() => {
      fetchData();
    }, [])
  
  return (
    <>
    <Toaster position='top-center' reverseOrder={false}/>
      <Button onClick={handleOpen} variant="contained" className='h-8' color="success">
        CHANGE PASSWORD
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h5" mb={2} mx={8}>
            Change password
          </Typography>
          <div className='mb-4'>
          <TextField label="Email" type="email" fullWidth value={email}  onChange={handleEmailChange}/>
          </div>
          <div className='mb-4'>
          <TextField label="Current passsword" type="password" fullWidth value={currentPassword} onChange={handleCurrentPasswordChange}/>
          </div>
          <div className='mb-4'>
          <TextField label="New password" type="password" fullWidth value={newPassword} onChange={handleNewPasswordChange}/>
          </div>
          <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default PasswordChangeModal