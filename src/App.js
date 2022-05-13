import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //After every component evaluation then this will run.
  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem('isLoggedIn');

  if (storedUserLoggedInInfo === '1') {
    setIsLoggedIn(true);
  }
  }, []);
  //Will only run once because the dependencies in the [] will never change as no dependencies have been declared.
  ///Once weve logged in even if we refresh it stays logged in.

  const loginHandler = (email, password) => {
    //Sotre data in local storeage in brower.
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
