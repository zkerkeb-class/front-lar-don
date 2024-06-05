import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Plans from './pages/Plans';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthenticationService from './services/auth-service';
import Home from './pages/Home';
import ConfirmSubscription from './pages/ConfirmSubscription';
import ChampSelect from './pages/ChampSelect';
import ChampionChatPage from './pages/ChampionChatPage';
import GoogleAuthSuccess from './pages/GoogleAuthSuccess';
import DiscordAuthSuccess from './pages/DiscordAuthSuccess';
import GithubAuthSuccess from './pages/GithubAuthSuccess';
import ConfirmMail from './pages/ConfirmMail';
import Account from './pages/Account';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <RouterContent />
    </Router>
  );
};

const RouterContent = () => {
  const [isLogged, setIsLogged] = useState(
    AuthenticationService.isAuthenticated()
  );
  const location = useLocation();

  useEffect(() => {
    setIsLogged(AuthenticationService.isAuthenticated());
  }, [location]);

  return (
    <div className={'p-6 mt-24 ' + (isLogged ? 'mt-16' : '')}>
      <Navbar
        navigation={[
          { to: '/home', label: 'ACCUEIL' },
          { to: '/plans', label: 'TARIFS' },
          { to: '/champselect', label: 'CHAMPIONS' },
          { to: '/account', label: 'MON COMPTE' },
        ]}
      />
      <Routes>
        {/* Routes disponibles qu'on soit connecté ou pas */}
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/confirm-email' element={<ConfirmMail />} />
        <Route path='/plans' element={<Plans />} />
        <Route path='/home' element={<Home />} />

        {
          // Si l'utilisateur n'est pas connecté, on n'affiche que les routes accessibles aux utilisateurs non connectés
          !isLogged && (
            <>
              <Route
                path='/google-auth-success'
                element={<GoogleAuthSuccess />}
              />
              <Route
                path='/discord-auth-success'
                element={<DiscordAuthSuccess />}
              />
              <Route
                path='/github-auth-success'
                element={<GithubAuthSuccess />}
              />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </>
          )
        }

        {
          // Si l'utilisateur est connecté, on n'affiche que les routes accessibles aux utilisateurs connectés
          isLogged && (
            <>
              <Route
                path='/confirm-subscription'
                element={<ConfirmSubscription />}
              />
              <Route path='/champselect' element={<ChampSelect />} />
              <Route
                path='/champion/:championId'
                element={<ChampionChatPage />}
              />
              <Route path='/account' element={<Account />} />
            </>
          )
        }

        {/* Si 404, afficher la page d'erreur */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
