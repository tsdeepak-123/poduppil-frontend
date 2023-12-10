import React, { useState } from 'react';
import Buttons from '../../CommonComponents/Button/Buttons';
import { useNavigate } from 'react-router-dom';
import TextFields from '../../CommonComponents/TextFields/TextFields';
import { useCookies } from 'react-cookie';
// import axios from 'axios'
import { axiosAdmin } from '../../../Api/Api';
import fieldValidate from '../../../Validation/Validate'
import { useDispatch } from 'react-redux';
import { AdminAction } from '../../../Stores/AdminAuth';
import toast,{Toaster} from "react-hot-toast"

function Login() {
  const [cookies, setCookies] = useCookies([]);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
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
          
          setCookies('AdminsecretKey',response?.data?.adminSignin?.token, { path: '/', expires: expirationDate });
          dispatch(AdminAction.AddAdmin({ token: response?.data?.adminSignin?.token}));

          toast.success(response?.data?.messege)
          
          navigate('/admin/dashboard');
        }else{
          toast.error(response?.data?.messege)
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.messege);
      });
  };

  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}/>
      <div className="flex flex-col items-center">
        <img
          src="/Images/podu.png"
          alt="Poduppil Logo"
          style={{ width: '320px', height: 'auto' }}
        />
        <form>
          <div className="mb-4">
            <TextFields
              name="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            <TextFields
              name="Password"
              type="password" 
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex justify-center mb-7">
            <Buttons name="LOGIN" classes={'h-12 w-[150px]'} click={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

