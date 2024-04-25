import Title from '../../components/Title';
import Text from '../../components/Text';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import UsersService from '../../services/users-service';

const ConfirmSubscription = () => {
  const [plan, setPlan] = useState('');

  const getPlan = async () => {
    UsersService.getUserSubscription().then((response) => {
      setPlan(response.name);
    });
  };

  useEffect(() => {
    getPlan();
  }, []);

  return (
    <div className='flex items-center justify-center text-white p-6'>
      <div className='text-center'>
        <div className='animate-bounce mb-8'>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className='mx-auto h-20 w-20 text-lolDark'
          />
        </div>
        <Title className='text-lolDark text-3xl mb-4'>
          Confirmation de votre abonnement
        </Title>
        <Text className='text-xl text-black'>
          Vous vous êtes abonné au {plan.toLowerCase()}.
        </Text>
        <Text className='text-xl text-black'>
          Vous avez maintenant accès à toutes les fonctionnalités de
          l'application.
        </Text>
      </div>
    </div>
  );
};

export default ConfirmSubscription;
