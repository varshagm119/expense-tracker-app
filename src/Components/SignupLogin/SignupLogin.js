import React, { useState } from 'react';
import classes from './SignupLogin.module.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const SignupLogin = () => {
    const [isLogin, setIsLogin] = useState(true);
    const switchHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

  return (
    <div className={classes.container}>
        <h1>Welcome to Expenses Tracker</h1>
        <div className={classes.auth}>
            {!isLogin && <SignupForm />}
            {isLogin && <LoginForm />}
        </div>
        <div className={classes.switchCon}>
            {isLogin && (
                <p>
                    Don't have an account?
                    <button onClick={switchHandler}>Sign Up</button>
                </p>
            )}
            {!isLogin && (
                <p>
                    Already have an account?
                    <button onClick={switchHandler}>Log In</button>
                </p>
            )}
        </div>
    </div>
  )
}

export default SignupLogin