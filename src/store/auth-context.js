import React, {useState, useEffect} from "react";

//Takes in a default context i.e App or your component wide state. usually tho its an object. We
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
    //Giving it a dummy function for better IDE auto completion.
});

export const AuthContextProvider = () => {

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

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const loginHandler =() => {
        //Store data in local storeage in brower.
    localStorage.setItem('isLoggedIn', '1')
        setIsLoggedIn(true);
    };

    return (
    <AuthContext.Provider 
        value={{
            isLoggedIn: isLoggedIn, 
            onLogout: loginHandler, 
            onLogin: loginHandler
        }}
    >
        {AuthContext.children}
    </AuthContext.Provider>
    )
}

export default AuthContext;

//To use Context in your applicaiton you need to provide it (All components that are wrapped by it should have access to it) 
// and then consume it (hook into it, listen to it). 

//In most cases you will use props to pass data to components because props allows you to configure components and make them reuseable. 
// Only if you have something which you would foward through a lot of components would you use Reacts Context API. 