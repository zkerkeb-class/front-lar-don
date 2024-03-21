import React from 'react';
import Text from '../../components/Text';
import Title from '../../components/Title';
import 'https://js.stripe.com/v3/pricing-table.js';

const Plans = () => {
  return (
    <div id='plans'>
      <Title>Tarifs</Title>

      <Text className='mb-4'>
        Bienvenue sur notre produit ! Voici les différents tarifs que nous
        proposons :
      </Text>

      <stripe-pricing-table
        pricing-table-id='prctbl_1OkTifDWGS6KsEMg3GvK58iH'
        publishable-key='pk_test_51OkSH5DWGS6KsEMgBrRmVZolxOvGhkKW4LQknuB4fZSCrfJlMfm3WYiVNz06oN1RuWQFjXibcXmMHSQAEOUSfXrk002RSmIE1Q'
      ></stripe-pricing-table>
    </div>
  );
};

export default Plans;
