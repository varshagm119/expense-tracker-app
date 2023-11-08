import React, { useEffect, useRef, useState } from "react";
import classes from "./LoginForm.module.css";
import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import ForgotPassForm from "./ForgotPassForm";
import axios from "axios";

const LoginForm = (props) => {
  const formRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const navigate = useNavigate();
  const [forgotVisible, setForgotVisible] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [isVerifyEmail, setIsVerifyEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const logoutTimerRef = useRef();

  useEffect(() => {
    if (auth.token) {
      startLogoutTimer();
    }
  }, [auth.token]);

  const startLogoutTimer = () => {
    clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(() => {
      handleLogout();
    }, 5*60000);
  };

  const handleLogout = () => {
    clearTimeout(logoutTimerRef.current);
    dispatch(authActions.logout());
    navigate("/");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDk7rzRZ8NqSoY0Doe49YZ8sDXPhnRK9Vs",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        try {
          const res = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDk7rzRZ8NqSoY0Doe49YZ8sDXPhnRK9Vs",
            {
              method: "POST",
              body: JSON.stringify({
                idToken: data.idToken,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const userData = await res.json();
          //console.log(userData)
          if (!userData.users[0].emailVerified) {
            setIsVerifyEmail(true);
            return;
          } else {
            setIsVerifyEmail(false);
            navigate('/profile/expense-tracker', {replace: true});
            startLogoutTimer();
            dispatch(
              authActions.login({token: data.idToken, email: data.email })              
            );
            const email = enteredEmail.replace(/[.@]/g, "");
            const modeRes = await axios.get(`https://expensetracker-b5d53-default-rtdb.asia-southeast1.firebasedatabase.app/${email}/userDetail.json`);
            if(modeRes.data){
              console.log('ForPremium');
            }
          }
        } catch (error) {
          alert(error);
        }
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  const linkClickHandler = () => {
    setForgotVisible(true);
  }

  return (
    <>
    {forgotVisible ? (
      <ForgotPassForm onReset={()=> setForgotVisible(false)} />
    ) : (
      <div className={classes.login}>
      <h1>Log In</h1>
      {isVerifyEmail && (
        <p style={{ color: "red" }}>Please verify your email</p>
      )}
      <Form ref={formRef}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password(Not less than 6)"
            ref={passwordInputRef}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
              <Link onClick={linkClickHandler}>Forgot Password?</Link>
            </Form.Group>
        <Button variant="primary" type="submit" onClick={submitHandler}>
          {!loading ? "Log in" : "Loading"}
        </Button>
      </Form>
    </div>
    )}
    </>
    
  );
};

export default LoginForm;
