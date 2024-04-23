import React, { useEffect, useState } from "react";
import Text from "../../components/Text";
import Title from "../../components/Title";
import "https://js.stripe.com/v3/pricing-table.js";
import AuthenticationService from "../../services/auth-service";

const Plans = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    AuthenticationService.getCurrentUser().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div id="plans" className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <Title className="text-4xl font-bold text-center text-gray-800 mb-6">
          Tarifs
        </Title>

        <Text className="text-center text-lg mb-6 text-gray-600">
          Bienvenue sur notre produit ! Voici les différents tarifs que nous
          proposons :
        </Text>

        {user?.stripeId ? (
          <div className="pricing-table-wrapper">
            <stripe-pricing-table
              className="stripe-pricing-table"
              pricing-table-id="prctbl_1OkTifDWGS6KsEMg3GvK58iH"
              publishable-key="pk_test_51OkSH5DWGS6KsEMgBrRmVZolxOvGhkKW4LQknuB4fZSCrfJlMfm3WYiVNz06oN1RuWQFjXibcXmMHSQAEOUSfXrk002RSmIE1Q"
              customer-session-client-secret={user.customerSecretId}
            ></stripe-pricing-table>
          </div>
        ) : (
          <Text className="text-center text-lg text-gray-600">
            Vous devez être connecté pour voir les tarifs.
          </Text>
        )}
      </div>
    </div>
  );
};

export default Plans;
