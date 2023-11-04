import React, { useRef } from "react";
import classes from "./LoginForm.module.css";
import { Form, Button } from "react-bootstrap";

const LoginForm = (props) => {
  const formRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      alert("Entered Password is not same as the confirmed password");
    }

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
      //console.log(data)
      localStorage.setItem("user", data.idToken);
      localStorage.setItem("userEmail", enteredEmail);
    } catch (error) {
      alert(error);
    }
    formRef.current.reset();
  };

  return (
    <div className={classes.login}>
      <h1>Log In</h1>
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
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordInputRef}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitHandler}>
          Log In
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
