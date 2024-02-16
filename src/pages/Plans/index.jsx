import React from 'react';
import Text from '../../components/Text';
import Title from '../../components/Title';
import Plan from '../../components/Plan';

const Plans = () => {
  const plans = [
    {
      id: 1,
      name: 'Plan de démarrage',
      advantages: [
        'Accès aux fonctionnalités de base',
        'Support par e-mail',
        'Mises à jour mensuelles',
      ],
      price: '10€/mois',
    },
    {
      id: 2,
      name: 'Plan Pro',
      advantages: [
        'Accès à toutes les fonctionnalités',
        'Support client prioritaire',
        'Mises à jour hebdomadaires',
      ],
      price: '30€/mois',
    },
    {
      id: 3,
      name: 'Plan Entreprise',
      advantages: [
        'Accès à toutes les fonctionnalités',
        'Gestionnaire de compte dédié',
        'Mises à jour quotidiennes',
      ],
      price: '70€/mois',
    },
  ];

  return (
    <div id='plans'>
      <Title>Tarifs</Title>

      <Text className='mb-4'>
        Bienvenue sur notre produit ! Voici les différents tarifs que nous
        proposons :
      </Text>

      <div className='flex justify-around'>
        {plans.map((plan) => (
          <Plan
            className='w-1/3 mx-4'
            key={plan.id}
            name={plan.name}
            price={plan.price}
            items={plan.advantages}
          />
        ))}
      </div>
    </div>
  );
};

export default Plans;
