import { useEffect, useState } from 'react';
import Title from '../../components/Title';
import Text from '../../components/Text';
import UsersService from '../../services/users-service';
import LardonLink from '../../components/LardonLink';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Account = () => {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordTokenSent, setIsPasswordTokenSent] = useState(false);
  const [passwordToken, setPasswordToken] = useState('');
  const [successPasswordChange, setSuccessPasswordChange] = useState(false);
  const [errorPasswordChange, setErrorPasswordChange] = useState(false);
  const [loadingPasswordChange, setLoadingPasswordChange] = useState(false);

  const handleSavePhoneNumber = async () => {
    setLoading(true);
    await UsersService.updatePhoneNumber(phoneNumber)
      .then((response) => {
        setUser({ ...user, phoneNumber });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getCurrentUser = async () => {
    const user = await UsersService.getCurrentUser();
    setUser(user);
  };

  const getSubscription = async () => {
    const subscription = await UsersService.getUserSubscription();
    setSubscription(subscription);
  };

  const handleResetPassword = () => {
    setIsPasswordTokenSent(true);

    UsersService.resetPassword().catch((error) => {
      console.error(error);
    });
  };

  const handleConfirmResetPassword = () => {
    setLoadingPasswordChange(true);

    UsersService.verifyResetPasswordToken({
      token: passwordToken,
      password,
    })
      .then((response) => {
        setIsPasswordTokenSent(false);
        setSuccessPasswordChange(true);
        setPassword('');
        setPasswordToken('');
        setLoadingPasswordChange(false);
      })
      .catch((error) => {
        setLoadingPasswordChange(false);
        setErrorPasswordChange(true);
      });
  };

  useEffect(() => {
    getCurrentUser();
    getSubscription();
  }, []);

  return (
    <>
      <Title>Mon compte</Title>
      <Text>
        {user ? (
          <>
            <p>
              Email: {user.email} (email{' '}
              {user.isLive ? 'confirmé' : 'non confirmé'})
            </p>
            <p>Nom d'utilisateur: {user.username}</p>
            <p>
              Tarif actuel: {subscription ? subscription.name : 'Chargement...'}
            </p>
            <p className='flex'>
              Numéro de téléphone: {''}
              {user.phoneNumber || (
                <span className='flex items-center ml-2 gap-2'>
                  <Input
                    className='py-[3px] w-40 -mt-2'
                    type='tel'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <Button
                    className='py-[2px]'
                    onClick={() => handleSavePhoneNumber}
                    loading={loading}
                  >
                    Enregistrer
                  </Button>
                </span>
              )}
            </p>
            {user.phoneNumber && !isPasswordTokenSent && (
              <>
                <p className='mt-2'>Nouveau mot de passe</p>
                <span className='flex items-center gap-2'>
                  <Input
                    className='py-[3px] w-40 -mt-2'
                    value={password}
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    className='py-[2px]'
                    disabled={loadingPasswordChange}
                    onClick={() => handleResetPassword}
                    loading={loading}
                  >
                    Enregistrer
                  </Button>
                </span>
                {successPasswordChange && (
                  <div className='rounded bg-green-400 border-green-900 border  text-green-900 mt-1 py-1 px-2 inline-block'>
                    Mot de passe changé avec succès
                  </div>
                )}
              </>
            )}

            {isPasswordTokenSent && (
              <div className='mt-2'>
                <p>
                  Entrez le code que vous avez reçu par SMS pour valider le
                  changement de mot de passe
                </p>
                <span className='flex items-center gap-2'>
                  <Input
                    className='py-[3px] w-40 -mt-2'
                    placeholder='XXXX'
                    value={passwordToken}
                    onChange={(e) => setPasswordToken(e.target.value)}
                  />
                  <Button
                    className='py-[2px]'
                    disabled={loadingPasswordChange}
                    onClick={() => handleConfirmResetPassword}
                    loading={loading}
                  >
                    Confirmer
                  </Button>
                </span>
                {errorPasswordChange && !loadingPasswordChange && (
                  <div className='rounded bg-red-400 border-red-900 border  text-red-900 mt-1 py-1 px-2 inline-block'>
                    Code invalide
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <p>Chargement...</p>
        )}
      </Text>
    </>
  );
};

export default Account;
