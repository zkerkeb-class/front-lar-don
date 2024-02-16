import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Plans from './pages/Plans';

const App = () => {
  return (
    <Router>
      <div className='p-6 bg-slate-200 min-h-screen'>
        <Routes>
          <Route path='/' element={<Navigate replace to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/plans' element={<Plans />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
