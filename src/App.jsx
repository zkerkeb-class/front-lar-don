import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import './App.css';
import Plans from './pages/Plans';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthenticationService from './services/auth-service';
import Home from './pages/Home';
import ConfirmSubscription from './pages/ConfirmSubscription';

const App = () => {
  return (
    <Router>
      <RouterContent></RouterContent>
    </Router>
  );
};

const RouterContent = () => {
  const [isLogged, setIsLogged] = useState(
    AuthenticationService.isAuthenticated()
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogged(AuthenticationService.isAuthenticated());
  }, [location]);

  useEffect(() => {
    if (
      !isLogged &&
      location.pathname !== '/login' &&
      location.pathname !== '/register'
    ) {
      navigate('/login');
    }
  }, [isLogged]);

  return (
    <div
      className={'p-6 bg-slate-200 min-h-screen ' + (isLogged ? 'mt-16' : '')}
    >
      <Navbar
        navigation={[
          { to: '/home', label: 'Accueil' },
          { to: '/plans', label: 'Plans' },
        ]}
      />
      <Routes>
        <Route
          path='/'
          element={
            isLogged ? <Navigate to='/home' /> : <Navigate to='/login' />
          }
        />
        <Route
          path='/login'
          element={isLogged ? <Navigate to='/home' /> : <Login />}
        />
        <Route
          path='/register'
          element={isLogged ? <Navigate to='/home' /> : <Register />}
        />
        <Route
          path='/home'
          element={isLogged ? <Home /> : <Navigate to='/login' />}
        />
        <Route path='/plans' element={<Plans />} />
        <Route path='/confirm-subscription' element={<ConfirmSubscription />} />
      </Routes>
    </div>
  );
};

export default App;
