import { useEffect, useState } from 'react';
import AuthenticationService from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const name = urlParams.get('name');
    AuthenticationService.loginWithGoogle({ email, name }).then(() => {
      navigate('/home');
    });
  }, []);

  return <></>;
};

export default GoogleAuthSuccess;
