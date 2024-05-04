import { useEffect } from 'react';
import AuthenticationService from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title';
import Text from '../../components/Text';
const GithubAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const username = urlParams.get('username');
    const id = urlParams.get('id');
    AuthenticationService.loginWithGithub({
      email,
      username,
      id,
    })
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Title>Connexion réussie</Title>
      <Text>Vous allez être redirigé vers la page d'accueil</Text>
    </>
  );
};

export default GithubAuthSuccess;
