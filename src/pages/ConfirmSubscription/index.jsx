import Title from "../../components/Title";
import Text from "../../components/Text";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const ConfirmSubscription = () => {
  const [planName, setPlanName] = useState("");
  const location = useLocation();

  const getPlan = () => {
    const params = new URLSearchParams(location.search);
    const plan = params.get("plan");
    const plans = {
      begin: "Démarrage",
      pro: "Pro",
      enterprise: "Entreprise",
    };
    return plans[plan] || "inconnu";
  };

  useEffect(() => {
    setPlanName(getPlan());
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-lolDark text-white p-6">
      <div className="text-center">
        <div className="animate-bounce mb-8">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="mx-auto h-20 w-20 text-lolGold"
          />
        </div>
        <Title className="text-lolGold text-3xl mb-4">
          Confirmation de votre abonnement
        </Title>
        <Text className="text-xl">
          Vous vous êtes abonné au plan {planName}.
        </Text>
      </div>
    </div>
  );
};

export default ConfirmSubscription;
