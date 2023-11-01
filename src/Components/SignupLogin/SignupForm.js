import React, { useRef } from "react";
import classes from "./SignupForm.module.css";
import { Form, Button } from "react-bootstrap";

const SignupForm = () => {
  const formRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
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
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type='password'
              placeholder="Confirm Password"
              ref={confirmPasswordInputRef}
              required
            />
        </Form.Group>
        <Button variant="primary" type="submit">
            Sign up
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
