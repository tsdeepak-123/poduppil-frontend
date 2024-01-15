import React, { useState } from 'react';
import Footer from "../../AdminComponents/Footer/Footer";
import Buttons from '../../CommonComponents/Button/Buttons';
import { useNavigate } from 'react-router-dom';
import TextFields from '../../CommonComponents/TextFields/TextFields';
import { useCookies } from 'react-cookie';
import { axiosAdmin } from '../../../Api/Api';
import fieldValidate from '../../../Validation/Validate';
import { useDispatch } from 'react-redux';
import { AdminAction } from '../../../Stores/AdminAuth';
import toast, { Toaster } from "react-hot-toast";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Login() {
  const [cookies, setCookies] = useCookies([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Added state for password visibility

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    const emailError = fieldValidate('email', email);
    setEmailError(emailError);
    if (emailError) {
      toast.error(emailError);
      return; 
    }

    // Validate password
    const passwordError = fieldValidate('password', password);
    setPasswordError(passwordError);
    if (passwordError) {
      toast.error(passwordError);
      return; 
    }

    axiosAdmin
      .post('login', { email, password })
      .then((response) => {
        if (response?.data?.success) {
          const currentDate = new Date();
          const ageInMinutes = 60
          const expirationDate = new Date(currentDate.getTime() + ageInMinutes * 60 * 1000); 
          
          setCookies('AdminsecretKey', response?.data?.adminSignin?.token, { path: '/', expires: expirationDate });
          dispatch(AdminAction.AddAdmin({ token: response?.data?.adminSignin?.token}));

          toast.success(response?.data?.message)
          
          navigate('/admin/dashboard');
        } else {
          toast.error(response?.data?.message)
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <div className='flex flex-col justify-between h-screen '>
      <Toaster position='top-center' reverseOrder={false}/>
      <div className="flex flex-col items-center">
        <img
          src="/Images/podu.png"
          alt="Poduppil Logo"
          style={{ width: '320px', height: 'auto' }}
        />
        <form>
          <div className="mb-4 relative">
            <TextFields
              name="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            <TextFields
              name="Password"
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={handlePasswordChange}
            />
            <span
              className="cursor-pointer absolute left-[90%] top-[67%] transform translate-x-[-50%] text-blue-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <RemoveRedEyeIcon className='text-blue-900'/> : <VisibilityOffIcon className='text-blue-900'/>}
            </span>
          </div>
          <div className="flex justify-center mb-7">
            <Buttons name="LOGIN" classes={'h-12 w-[150px]'} click={handleSubmit} />
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default Login;
