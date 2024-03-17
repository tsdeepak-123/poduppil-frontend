import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AdminAction } from '../../../Stores/AdminAuth';
import { useCookies } from 'react-cookie';
import { Toaster, toast } from 'react-hot-toast';
import Button from '@mui/material/Button';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

function Header({ headers }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookies, removeCookies] = useCookies(['AdminsecretKey']);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('You are online!',{autoClose:4000});
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error('You are offline',{autoClose:4000});
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLogout = () => {
    removeCookies('AdminsecretKey');
    dispatch(AdminAction.AdminLogout());
    navigate('/admin');
  };

  return (
    <div>
      {/* <Toaster position="top-right"/> */}
      <header className='flex justify-between fixed top-0 w-full z-50'>
        <div>
          <div className='w-[150px] h-auto'>
            <img className='cursor-pointer' src="/Images/podu.png" alt="Your Logo" onClick={() => { navigate('/admin/dashboard') }} />
          </div>
        </div>
        <h2 className='text-black mt-16 font-bold'>{headers}</h2>
        <div className='mt-16'>
          <Button startIcon={<PowerSettingsNewIcon />} style={{ color: "red" }} onClick={handleLogout}>
            <span className='hidden md:inline-block'> LOGOUT</span>
          </Button>
        </div>
      </header>
    </div>
  );
}

export default Header;
