import React, { useEffect, useState } from 'react';
import Text from '../../components/Text';
import Title from '../../components/Title';
import 'https://js.stripe.com/v3/pricing-table.js';
import AuthenticationService from '../../services/auth-service';

const Plans = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    AuthenticationService.getCurrentUser().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div id='plans'>
      <Title>Tarifs</Title>

      <Text className='mb-4'>
        Bienvenue sur notre produit ! Voici les différents tarifs que nous
        proposons :
      </Text>

      {user.stripeId ? (
        <stripe-pricing-table
          pricing-table-id='prctbl_1OkTifDWGS6KsEMg3GvK58iH'
          publishable-key='pk_test_51OkSH5DWGS6KsEMgBrRmVZolxOvGhkKW4LQknuB4fZSCrfJlMfm3WYiVNz06oN1RuWQFjXibcXmMHSQAEOUSfXrk002RSmIE1Q'
          customer-session-client-secret={user.customerSecretId}
        ></stripe-pricing-table>
      ) : (
        <Text>Vous devez être connecté pour voir les tarifs.</Text>
      )}
    </div>
  );
};

export default Plans;
