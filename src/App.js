import React from 'react';
import './App.css';
import wolfpack_logo from './assets/images/wolfpack_logo_2.png';

import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import { Nav } from 'grommet';
import { Menu } from 'grommet-icons';


import Home from './components/Home/Home';
import Auth from './components/Home/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Leagues from './components/Dashboard/Leagues/Leagues';
import League from './components/Dashboard/League/League';

function App() {
  const navigate = useNavigate();

  const [sessionToken, setSessionToken] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState('');
  const [userID, setUserID] = React.useState('');
  const [authenticated, setAuthenticated] = React.useState('');
  const [state, setState] = React.useState({
    right: false,
    left: false,
  });

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
        setSessionToken(localStorage.getItem('token'));
    }
    if (localStorage.getItem('currentUser')) {
        setCurrentUser(localStorage.getItem('currentUser'));
    }
    if (localStorage.getItem('userID')) {
        setUserID(localStorage.getItem('userID'));
    }
    if(localStorage.getItem('authenticated')) {
      setAuthenticated(localStorage.getItem('authenticated'))
    }

    if (!localStorage.getItem('authenticated')) {
      navigate('/');
    }
  }, []);

  const updateLocalStorage = (newToken, user, id) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('currentUser', user);
    localStorage.setItem('userID', id);
    localStorage.setItem('authenticated', id)
    setSessionToken(newToken);
    setCurrentUser(user);
    setUserID(id);
    setAuthenticated(id);
  }

  const clearLocalStorage = () => {
    localStorage.clear();
    setSessionToken(undefined);
    setCurrentUser('');
    setUserID('');
    setAuthenticated('');
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div className='App'>

      <Routes>

        <Route index element={ <Home /> } />

        <Route path='auth' 
          element={ 
            <Auth 
              sessionToken={sessionToken} 
              updateLocalStorage={updateLocalStorage} 
              authenticated={authenticated} /> 
          } 
        />

        <Route path='dashboard' element={
          <Dashboard
            sessionToken={sessionToken}
            userID={userID} 
            currentUser={currentUser} 
            authenticated={authenticated} 
            clearLocalStorage={clearLocalStorage}
            toggleDrawer={toggleDrawer}
            state={state}
          />
        } />

      </Routes>
    </div>
  );
}

export default App;
