import React, { Fragment, useEffect, useState } from "react";
import classes from "./Profile.module.css";
import { useLocation } from "react-router-dom";
import UpdateProfileForm from "./UpdateProfileForm";

const Profile = () => {
  const location = useLocation();
  const isLocation = location.pathname === "/profile";
  const [userData, setUserData] = useState(null);

    const updateVisibleHandler = async() => {
      try{
          const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDk7rzRZ8NqSoY0Doe49YZ8sDXPhnRK9Vs',
          {
              method: 'POST',
              headers: {
                  'Content-Type': 'application-json',
              },
              body: JSON.stringify({
                  idToken: localStorage.getItem('user')
              })
          });
          const data = await response.json();
          const user = data.users[0];
          setUserData(user);
      }catch(error){
          alert(error);
      }
    }

    useEffect(() => {
      updateVisibleHandler();
    },[]);

  return (
    <Fragment>
      <section className={classes.proCon}>
        <div className={classes.header}>
          <div className={classes.headerDetail}>
            <h4>Welcome to Expense Tracker</h4>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
              alt="profile"
            />
            <span className={classes.incomplete}>
              Your profile is incomplete
              <button>Complete now</button>
            </span>
          </div>
        </div>
      </section>
      <section className={classes.sectionLower}>
         <UpdateProfileForm user={userData} update={updateVisibleHandler} />
      </section>
    </Fragment>
  );
};

export default Profile;
