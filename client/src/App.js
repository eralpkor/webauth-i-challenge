import React from 'react';
import './App.css';
import Login from './components/login';
import Users from './components/users';
import { Route, NavLink } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/register'>Register</NavLink>
      </header>

      <Route path='/login' component={Login} />
      <Route exact path='/' component={Users} />
    </div>
  );
}

export default App;
