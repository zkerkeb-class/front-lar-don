import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Plans from './pages/Plans';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthenticationService from './services/auth-service';
import Home from './pages/Home';

const App = () => {
  const [isLogged, setIsLogged] = useState(
    AuthenticationService.isAuthenticated()
  );
  const navigation = [
    { to: '/login', element: <Login />, nav: false },
    { to: '/register', element: <Register />, nav: false },
    {
      to: '/register',
      label: 'Register',
      element: <Register />,
      nav: !isLogged,
    },
    { to: '/plans', label: 'Plans', element: <Plans /> },
    {
      to: '/home',
      element: <Home />,
      nav: false,
    },
  ];

  return (
    <Router>
      <Navbar navigation={navigation}></Navbar>
      <div
        className={'p-6 bg-slate-200 min-h-screen ' + (isLogged ? 'mt-16' : '')}
      >
        <Routes>
          <Route
            path='/'
            element={<Navigate replace to={isLogged ? '/home' : '/login'} />}
          />
          {navigation.map((route) => (
            <Route key={route.to} path={route.to} element={route.element} />
          ))}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
