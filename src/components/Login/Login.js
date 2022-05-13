import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {

  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log('Effect running');
  }, []);
  //this effect function runs after every component render cycle.
  //once we add an empty array. Now this function here, only executes for the first time this component was mounted and 
  //rendered, but not thereafter, not for any subsequent rerender cycle.
  //Alternatively, we add a dependency like entered email or entered password. Now this function here, reruns whenever the component was re-evaluated
  //and this state, in this case here, changed.

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('checking form validity');
      setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6
    );
    }, 500);
    //whenever this useEffect function runs, before it runs, except for the very first time when it runs, this cleanup function will run.
    //So the cleanup function runs before every new side effect function execution and before the component is removed.
    return () => {
      console.log('Cleaned Up');
      clearTimeout(identifier);
    };
    //If we want to be sending an HTTP request here, we would have now only sent once instead of a dozen HTTP requests. And that's an improvement.
    
  }, [enteredEmail, enteredPassword]);
  //There is a simple rule as to what you put in the [], you add as dependencies, what you're using in your side effect function.
  //After every login component function execution, it will rerun this useEffect function but only if either setFormIsValid,
  //or enteredEmail or enteredPassword,changed in the last component rerender cycle.

  //So that's another scenario where useEffect shines. It helps us make sure that we have one code, in one place, instead of as before in multiple places
  //which reruns, whenever one of the dependencies changed. So it's not just for when a component was created for the first time,but it's equally 
  //common to use it to rerun logic when certain data, typically some state or some props changed.

  //useEffect in general, is a super important hook that helps you deal with code that should be executed in response to something. And something could 
  //be the component being loaded. 

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
