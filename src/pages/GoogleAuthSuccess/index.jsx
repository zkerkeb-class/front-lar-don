import { useEffect, useState } from 'react';
import AuthenticationService from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const name = urlParams.get('name');
    const googleId = urlParams.get('googleId');
    AuthenticationService.loginWithGoogle({ email, name, googleId }).then(
      () => {
        navigate('/plans');
      }
    );
  }, []);

  return (
    <div>
      <h1>Google Auth Success</h1>
    </div>
  );
};

export default GoogleAuthSuccess;
