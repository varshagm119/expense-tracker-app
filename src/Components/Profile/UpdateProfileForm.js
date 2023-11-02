import React, { useEffect, useRef } from "react";
import classes from "./UpdateProfileForm.module.css";
import { Button, Form } from "react-bootstrap";

const UpdateProfileForm = (props) => {
  const formRef = useRef();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const contactInputRef = useRef();
  const locationInputRef = useRef();

  useEffect(() => {
    if(props.user){
        if(props.user.displayName){
            nameInputRef.current.value = props.user.displayName;
        }
        emailInputRef.current.value = props.user.email
    }
  },[props.user]);

  const updateHandler = async(e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredContact = contactInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;
    try{
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDk7rzRZ8NqSoY0Doe49YZ8sDXPhnRK9Vs',
        {
            method: 'POST',
            body: JSON.stringify({
                idToken: localStorage['user'],
                displayName: enteredName,
                contact: enteredContact,
                location: enteredLocation,
                returnServiceToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const updateData = await response.json();
        if(response.ok){
            alert('Profile updated');
            props.update();
            nameInputRef.current.value = props.user.displayName;
            emailInputRef.current.value = props.user.email;
        }
        else{
            throw new Error("Updation failed!. Please try again.");
        }
        formRef.current.reset();
    }catch(error){
        alert(error);
    }
  }

  return (<div>
    <section className={classes.updateForm}>
        <h1>Update Profiles</h1>
        <Form ref={formRef}>
            <Form.Group className={classes['mb-3']}>
                <Form.Label className={classes.label}>Email</Form.Label>
                <Form.Control placeholder="Email" ref={emailInputRef} />
            </Form.Group>
            <Form.Group className={classes['mb-3']}>
                <Form.Label className={classes.label}>Name</Form.Label>
                <Form.Control placeholder="Name" ref={nameInputRef} />
            </Form.Group>
            <Form.Group className={classes['mb-3']}>
                <Form.Label className={classes.label}>Contact no</Form.Label>
                <Form.Control placeholder="Contact no" ref={contactInputRef} />
            </Form.Group>
            <Form.Group className={classes['mb-3']}>
                <Form.Label className={classes.label}>Location</Form.Label>
                <Form.Control placeholder="Email" ref={locationInputRef} />
            </Form.Group>
            <Button type="submit" onClick={updateHandler}>
                Update
            </Button>
        </Form>
    </section>
  </div>);
};

export default UpdateProfileForm;
