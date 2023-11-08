import React, { useRef, useState } from "react";
import classes from "./SignupForm.module.css";
import { Form, Button } from "react-bootstrap";

const SignupForm = () => {
  const formRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);

  const submitHandler = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if(enteredPassword !== enteredConfirmPassword){
      alert('Entered Password is not same as the confirmed password');
    }
    try{
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDk7rzRZ8NqSoY0Doe49YZ8sDXPhnRK9Vs',
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      if(response.ok){
        try{
          const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDk7rzRZ8NqSoY0Doe49YZ8sDXPhnRK9Vs',
          {
            method: 'POST',
            body: JSON.stringify({
              requestType: 'VERIFY_EMAIL',
              idToken: data.idToken
            }),
            headers: {
              "content-type": "application/json",
            },
          })
          if(res.ok){
            setIsLoading(false);
            alert('Verification email sent');
            setVerifyEmail(true);
            setTimeout(() => {
              setVerifyEmail(false);
            }, 10000)
          } else {
            throw new Error("Sign up failed, try again.");
          }
        }catch(err){
          alert(err);
        }
      }
    }catch(error){
      alert(error);
      setIsLoading(false);
    }
    formRef.current.reset();
  };

  return (
    <div className={classes.signup}>
      <h1>Sign up</h1>
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
              type='password'
              placeholder="Password(Not less than 6)"
              ref={passwordInputRef}
              required
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type='password'
              placeholder="Confirm Password"
              ref={confirmPasswordInputRef}
              required
            />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitHandler}>
          {!isLoading ? 'Sign up' : 'Sending request...'}
        </Button>
        { verifyEmail && (
          <p style={{margin: "1rem", color:"green"}}>
            Please verify email. verification mail already sent
          </p>
        )}
      </Form>
    </div>
  );
};

export default SignupForm;
