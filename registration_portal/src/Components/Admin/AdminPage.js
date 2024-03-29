import React, { useState } from 'react';
import './AdminPage.css';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function AdminPage() {
  const { login } = useAuth();
  const BACKEND_URL = process.env.REACT_APP_EMR_BACKEND_BASE_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/kiosk/login?userName=${loginUserName}&password=${loginPassword}`);
      if (response.data) {
        localStorage.setItem('profileData', JSON.stringify(response.data.profile));
        toast.success("Login Successful", {
          position: "top-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        localStorage.setItem("adminToken",response.data.profile.tokenNo);
        // Setting authentication status in local storage
        localStorage.setItem('isAuthenticated', 'true');

        login(); // Call the login function from the context
  
        await delay(2000);
        navigate('/Home');
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 400) {
        toast.error("Bad Credentials!!!!", {
          position: "top-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Something went wrong!!!!", {
          position: "top-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        handleLogin();
    }
};

  return (
    <div className='AdminPage'>
      <div className='AdminContainer'>
        <div className='HeaderSignin'>
          ADMIN LOGIN
        </div>
        <div className='InputfieldContainer'>
          <div>
          <div className='AdminLabel'>Username</div>
            <input
              className='inputBox'
              type="text"
              placeholder='Enter User Name'
              value={loginUserName}
              onChange={(e) => setLoginUserName(e.target.value)}
            />
          </div>
          <div style={{display:'flex', flexDirection:'column'}}>
          <div className='AdminLabel'>Password</div>
            <input
              className='inputBox'
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your Password'
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <label style={{marginTop:'10px'}}>
              <input
                type="checkbox"
                className='AdminCheckbox'
                onChange={toggleShowPassword}
              />
              Show Password
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className='SigninButton' onClick={handleLogin}>
              LogIn
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default AdminPage;
