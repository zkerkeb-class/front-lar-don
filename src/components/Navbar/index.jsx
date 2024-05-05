import { useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../../assets/img/logo.png';
import LardonLink from '../LardonLink';
import AuthenticationService from '../../services/auth-service';
import { useEffect, useState } from 'react';

const Navbar = ({ navigation = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(
    AuthenticationService.isAuthenticated()
  );

  useEffect(() => {
    setIsLogged(AuthenticationService.isAuthenticated());
  }, [location]);

  const handleLogout = () => {
    AuthenticationService.logout();
    setIsLogged(false);
    navigate('/');
  };

  return (
    <nav className='fixed top-0 left-0 right-0 z-30 flex items-center justify-between w-full px-6 py-3 shadow-md bg-lolGrey-navbar h-16'>
      <LardonLink
        to='/'
        className='flex text-lg font-serif items-center text-lolGold-2 hover:text-lolGold-1 transition duration-300 ease-in-out'
      >
        <img src={logoImage} alt='Lardon Logo' className='h-16 mr-4' />
        LARDON
      </LardonLink>

      <div className='flex items-center font-serif'>
        {isLogged ? (
          navigation
            .filter((route) => route.nav !== false)
            .map((route) => (
              <LardonLink
                key={route.to}
                to={route.to}
                className='flex items-center text-lg text-lolGold-2 hover:text-lolGold-1 ml-6 transition duration-300 ease-in-out'
                active={location.pathname === route.to}
              >
                {route.label}
              </LardonLink>
            ))
        ) : (
          <>
            <LardonLink
              to='/login'
              className='flex items-center text-lg text-lolGold-2 hover:text-lolGold-1 ml-6 transition duration-300 ease-in-out'
            >
              CONNEXION
            </LardonLink>
            <LardonLink
              to='/register'
              className='flex items-center text-lg text-lolGold-2 hover:text-lolGold-1 ml-6 transition duration-300 ease-in-out'
            >
              INSCRIPTION
            </LardonLink>
          </>
        )}
        {isLogged && (
          <LardonLink
            onClick={handleLogout}
            className='flex items-center text-lg text-lolGold-2 hover:text-lolGold-1 ml-6 transition duration-300 ease-in-out'
          >
            DÉCONNEXION
          </LardonLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
