import React, { Fragment } from "react";
import classes from "./Profile.module.css";
import { useLocation } from "react-router-dom";
import UpdateProfileForm from "./UpdateProfileForm";

const Profile = () => {
  const location = useLocation();
  const isLocation = location.pathname === "/profile";
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
        {isLocation && <UpdateProfileForm />}
      </section>
    </Fragment>
  );
};

export default Profile;
