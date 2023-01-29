import React from 'react';
import './App.css';

import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';

function App() {

  const [sessionToken, setSessionToken] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState('');
  const [userID, setUserID] = React.useState('');
  const [authenticated, setAuthenticated] = React.useState('');
  const [loginToggle, setLoginToggle] = React.useState(false);

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

  return (
    <div className='App'>
      <div>
        {
          loginToggle && !authenticated ? <Auth sessionToken={sessionToken} updateLocalStorage={updateLocalStorage} authenticated={authenticated} loginToggle={loginToggle} setLoginToggle={setLoginToggle} /> 
          : !loginToggle && !authenticated ? <Home loginToggle={loginToggle} setLoginToggle={setLoginToggle} />
          : !loginToggle && authenticated ? <Profile sessionToken={sessionToken} userID={userID} currentUser={currentUser} authenticated={authenticated} clearLocalStorage={clearLocalStorage} />
          : <p>something went wrong</p>
        }
      </div>
    </div>
  );
}

export default App;
