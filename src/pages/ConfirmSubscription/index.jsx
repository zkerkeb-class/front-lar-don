import Title from '../../components/Title';
import Text from '../../components/Text';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ConfirmSubscription = () => {
  const [planName, setPlanName] = useState('');
  const location = useLocation();
  const getPlan = () => {
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    const plans = {
      begin: 'Démarrage',
      pro: 'Pro',
      enterprise: 'Entreprise',
    };
    return plans[plan] || 'inconnu';
  };

  useEffect(() => {
    setPlanName(getPlan());
  }, []);

  return (
    <div>
      <Title>Confirmation de votre abonnement</Title>
      <Text>Vous vous êtes abonné au plan {planName}.</Text>
    </div>
  );
};

export default ConfirmSubscription;
