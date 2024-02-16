import React, { useState } from 'react';
import LardonLink from '../../components/LardonLink';
import Button from '../../components/Button';
import Title from '../../components/Title';
import Input from '../../components/Input';

const Register = () => {
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Enregistrement avec', username, email, password);
    console.log('Same values passwords', validationSameValues(password, passwordConfirmation))
    console.log('Same values emails', validationSameValues(email, emailConfirmation))
  };

  const validationSameValues = (target1, target2) => {
    return target1 == target2;
  };

  return (
    <div id='register'>
      <form onSubmit={handleSubmit}>
        <Title level='2'>Inscription</Title>

        <div className='mb-4'>
          <Input
            label="Nom d'utilisateur"
            type='text'
            value={username}
            onChange={setUsername}
            required
          />
        </div>

        <div className='mb-4'>
          <Input
            label='Email'
            type='email'
            value={email}
            onChange={setEmail}
            required
          />
        </div>

        <div className='mb-4'>
          <Input
            label="Confirmation de l'email"
            type='email'
            value={emailConfirmation}
            onChange={setEmailConfirmation}
            required
          />
        </div>

        <div className='mb-6'>
          <Input
            label='Mot de passe'
            type='password'
            value={password}
            onChange={setPassword}
            required
          />
        </div>

        <div className='mb-6'>
          <Input
            label='Confirmation du mot de passe'
            type='password'
            value={passwordConfirmation}
            onChange={setPasswordConfirmation}
            required
          />
        </div>

        <div className='flex items-center justify-between'>
          <Button type='submit'>S'inscrire</Button>

          <LardonLink to='/login'>
            Vous avez déjà un compte ? Se connecter
          </LardonLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
