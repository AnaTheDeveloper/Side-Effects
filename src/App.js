import React, {useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {

  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>      
      <MainHeader/>
      <main>
        {!ctx && <Login/>}
        {ctx && <Home/>}
      </main>
    </React.Fragment>
  );
}

export default App;

//Some developers prefer this more focused and separated approach where every component has one job essentially (rendering the TSK)and not a ton of jobs.

//React COntext is great for app-wide or component-wide state, states that affects multiple components. It's not a replacement for component configuration.
//It is not optimized for high frequency changes -  ie multiple state changes a second.

//Rules of Hooks: https://reactjs.org/docs/hooks-rules.html
//Only call hooks at top level.
//Call hooks from React function components.

