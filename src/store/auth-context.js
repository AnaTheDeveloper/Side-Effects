import React from "react";

//Takes in a default context i.e App or your component wide state. usually tho its an object. We
const AuthContext = React.createContext({
    isLoggedIn: false
});

export default AuthContext;

//To use Context in your applicaiton you need to provide it (All components that are wrapped by it should have access to it) 
// and then consume it (hook into it, listen to it). 