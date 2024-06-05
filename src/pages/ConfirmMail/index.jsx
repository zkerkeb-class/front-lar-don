import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title';
import Text from '../../components/Text';
import UsersService from '../../services/users-service';

const ConfirmMail = () => {
  const navigate = useNavigate();

  const confirmEmail = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    UsersService.confirmEmail(token)
      .then(() => {
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    confirmEmail();
  }, []);

  return (
    <>
      <Title>Merci d'avoir confirmé votre mail</Title>
      <Text>Vous allez être redirigé vers la page d'accueil</Text>
    </>
  );
};

export default ConfirmMail;
