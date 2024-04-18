import { useLocation } from 'react-router-dom';
import LardonLink from '../LardonLink';
import AuthenticationService from '../../services/auth-service';
import { useEffect, useState } from 'react';

const Navbar = ({ navigation }) => {
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(
    AuthenticationService.isAuthenticated()
  );

  const getIsLogged = () => {
    setIsLogged(AuthenticationService.isAuthenticated());
  };
  useEffect(() => {
    getIsLogged();
  }, [location]);

  const handleLogout = () => {
    AuthenticationService.logout();
  };

  return isLogged ? (
    <nav className='fixed top-0 left-0 right-0 flex justify-between items-center bg-slate-200 shadow-xl h-16 px-4'>
      <LardonLink
        to='/'
        className='text-lg'
        active={['/', '/home'].includes(location.pathname)}
      >
        Lardon
      </LardonLink>

      <div className='flex'>
        {navigation
          .filter((route) => route.nav !== false)
          .map((route) => (
            <LardonLink
              key={route.to}
              to={route.to}
              className='text-lg ml-4'
              active={location.pathname === route.to}
            >
              {route.label}
            </LardonLink>
          ))}

        <LardonLink to='/login' className='text-lg ml-4' onClick={handleLogout}>
          {AuthenticationService.isAuthenticated() ? 'Déconnexion' : 'Login'}
        </LardonLink>
      </div>
    </nav>
  ) : (
    <></>
  );
};

export default Navbar;
