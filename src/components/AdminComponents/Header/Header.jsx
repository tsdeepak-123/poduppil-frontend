import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AdminAction } from '../../../Stores/AdminAuth';
import { useCookies } from 'react-cookie';
import { Toaster, toast } from 'react-hot-toast';
import Button from '@mui/material/Button';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { FaHome } from "react-icons/fa";

function Header({ headers }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookies, removeCookies] = useCookies(['AdminsecretKey']);

  const handleLogout = () => {
    removeCookies('AdminsecretKey');
    dispatch(AdminAction.AdminLogout());
    navigate('/admin');
  };
  const handleDashboard = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div>
      <header className='flex justify-between fixed top-0 w-full z-50'>
        <div>
          <div className='w-[150px] h-auto'>
            <img className='cursor-pointer' src="/Images/podu.png" alt="Your Logo" onClick={() => { navigate('/admin/dashboard') }} />
          </div>
        </div>
        <h2 className='text-black mt-16 font-bold'>{headers}</h2>
        <div className='mt-16 flex flex-row gap-8 '>
          <div className='cursor-pointer mt-1 text-blue-500'>
          <FaHome className='w-6 h-6' onClick={handleDashboard}/>
          </div>
          <div>
          <Button startIcon={<PowerSettingsNewIcon />} style={{ color: "red" }} onClick={handleLogout}>
            <span className='hidden md:inline-block'> LOGOUT</span>
          </Button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
