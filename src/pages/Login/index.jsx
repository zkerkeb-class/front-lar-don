import React, { useState } from 'react';
import Input from '../../components/Input';
import Title from '../../components/Title';
import Button from '../../components/Button';
import LardonLink from '../../components/LardonLink';
import AuthenticationService from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await AuthenticationService.login({
      email: email,
      password: password,
    })
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
      });
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_URL_OAUTH}/auth/google`;
  };

  const handleDiscordLogin = () => {
    window.location.href = `${process.env.REACT_APP_URL_OAUTH}/auth/discord`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${process.env.REACT_APP_URL_OAUTH}/auth/github`;
  };

  return (
    <div id='login'>
      <form>
        <Title level='2'>Connexion</Title>
        <div className='mb-4'>
          <Input
            label='Email'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='mb-6'>
          <Input
            label='Mot de passe'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <Alert type='error'>{error}</Alert>}
        <div className='flex items-center gap-6'>
          <Button type='button' onClick={() => handleSubmit}>
            Se connecter
          </Button>
          <Button type='button' onClick={() => handleGoogleLogin}>
            Connexion avec Google
          </Button>

          <Button type='button' onClick={() => handleDiscordLogin}>
            Connexion avec Discord
          </Button>

          <Button type='button' onClick={() => handleGithubLogin}>
            Connexion avec Github
          </Button>

          <LardonLink to='/register' className='ml-auto'>
            Pas encore de compte ? S'inscrire
          </LardonLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
