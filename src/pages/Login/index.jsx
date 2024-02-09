import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importez Link de react-router-dom
import Input from '../../components/Input';
import Title from '../../components/Title';
import Button from '../../components/Button';
import LardonLink from '../../components/LardonLink';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logique de connexion ici
    console.log('Connexion avec', email, password);
  };

  return (
    <div id='login'>
      <form onSubmit={handleSubmit}>
        <Title level='2'>Connexion</Title>
        <div className='mb-4'>
          <Input
            label='Email'
            type='email'
            value={email}
            onChange={setEmail}
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

        <div className='flex items-center justify-between'>
          <Button type='submit'>Se connecter</Button>
          <LardonLink to='/register'>
            Pas encore de compte ? S'inscrire
          </LardonLink>

          {/* Bouton/lien pour aller à la page d'enregistrement */}
        </div>
      </form>
    </div>
  );
}

export default Login;
