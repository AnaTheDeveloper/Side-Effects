import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

//This function can be created outside of the scope of this component function because it does not need to interact with anything or handle any data.
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
}

const Login = (props) => {

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  // useEffect(() => {
  //   console.log('Effect running');
  // }, []);
  //this effect function runs after every component render cycle.
  //once we add an empty array. Now this function here, only executes for the first time this component was mounted and 
  //rendered, but not thereafter, not for any subsequent rerender cycle.
  //Alternatively, we add a dependency like entered email or entered password. Now this function here, reruns whenever the component was re-evaluated
  //and this state, in this case here, changed.

  //Here we are using object destructuring to pull properties of objects. For exmaple, from emailState we can extract isValid and store it
  //in a new constant of the same name.
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('checking form validity');
      setFormIsValid(
      emailIsValid && passwordIsValid
    );
    }, 500);
    //whenever this useEffect function runs, before it runs, except for the very first time when it runs, this cleanup function will run.
    //So the cleanup function runs before every new side effect function execution and before the component is removed.
    return () => {
      console.log('Cleaned Up');
      clearTimeout(identifier);
    };

    //If we want to be sending an HTTP request here, we would have now only sent once instead of a dozen HTTP requests. And that's an improvement.
    
  }, [emailIsValid, passwordIsValid]);
  //There is a simple rule as to what you put in the [], you add as dependencies, what you're using in your side effect function.
  //After every login component function execution, it will rerun this useEffect function but only if either setFormIsValid,
  //or enteredEmail or enteredPassword,changed in the last component rerender cycle.

  //So that's another scenario where useEffect shines. It helps us make sure that we have one code, in one place, instead of as before in multiple places
  //which reruns, whenever one of the dependencies changed. So it's not just for when a component was created for the first time,but it's equally 
  //common to use it to rerun logic when certain data, typically some state or some props changed.

  //useEffect in general, is a super important hook that helps you deal with code that should be executed in response to something. And something could 
  //be the component being loaded. 

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value})

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
