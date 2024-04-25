import Title from '../../components/Title';
import Text from '../../components/Text';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import plans from '../../utils/consts/plans';
import UsersService from '../../services/users-service';
import { saveUser } from '../../utils/save-user';

const ConfirmSubscription = () => {
  const [plan, setPlan] = useState('');
  const location = useLocation();

  const getPlan = () => {
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    return plan;
  };

  const updateSubscription = () => {
    console.log({
      subscriptionId: plan,
    });
    UsersService.updateSubscription({
      subscriptionId: plan,
    }).then((response) => {
      saveUser(response.data);
      console.log('Subscription updated:', response.data);
    });
  };

  useEffect(() => {
    setPlan(getPlan());
  }, []);

  useEffect(() => {
    if (plan) {
      updateSubscription();
    }
  }, [plan]);

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
          Vous vous êtes abonné au plan {plans[plan]}.
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
