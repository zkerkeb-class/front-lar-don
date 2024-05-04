import Title from '../../components/Title';
import Text from '../../components/Text';
import LardonLink from '../../components/LardonLink';

const NotFound = () => {
  return (
    <>
      <Title>404 - Page non trouvée</Title>
      <Text>La page que vous cherchez n'existe pas.</Text>
      <LardonLink to={'/home'}>Retourner à l'accueil</LardonLink>
    </>
  );
};

export default NotFound;
