import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate pour gérer la redirection
import LardonLink from '../../components/LardonLink';
import Button from '../../components/Button';
import Title from '../../components/Title';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import AuthenticationService from '../../services/auth-service';

const Register = () => {
  const [email, setEmail] = useState(`test-${Date.now()}@mail.com`);
  const [emailConfirmation, setEmailConfirmation] = useState(
    `test-${Date.now()}@mail.com`
  );
  const [password, setPassword] = useState(`test-${Date.now()}`);
  const [passwordConfirmation, setPasswordConfirmation] = useState(
    `test-${Date.now()}`
  );
  const [username, setUsername] = useState(`test-${Date.now()}`);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password !== passwordConfirmation) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    if (email !== emailConfirmation) {
      setError('Les emails ne correspondent pas.');
      return;
    }

    const body = { username, email, password };

    await AuthenticationService.register(body)
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <div id='register'>
      <form>
        <Title level='2'>Inscription</Title>
        <div className='mb-4'>
          <Input
            label="Nom d'utilisateur"
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <Input
            label='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <Input
            label="Confirmation de l'email"
            type='email'
            value={emailConfirmation}
            onChange={(e) => setEmailConfirmation(e.target.value)}
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
        <div className='mb-6'>
          <Input
            label='Confirmation du mot de passe'
            type='password'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>

        {error && <Alert type='error'>{error}</Alert>}

        <div className='flex items-center justify-between'>
          <Button type='button' onClick={() => handleSubmit}>
            S'inscrire
          </Button>
          <LardonLink to='/login'>
            Vous avez déjà un compte ? Se connecter
          </LardonLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
