import React, { Fragment, useEffect, useState } from "react";
import classes from "./Profile.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import UpdateProfileForm from "./UpdateProfileForm";
import { authActions } from "../../store/auth-slice";
import { expenseActions } from "../../store/expense-slice";
import {themeActions} from '../../store/theme-slice';
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isDarkMode = useSelector((state) => state.theme.isDark);
  const location = useLocation();
  const navigate = useNavigate();
  const isLocation = location.pathname === "/profile";
  const [userData, setUserData] = useState(null);

  const updateVisibleHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDk7rzRZ8NqSoY0Doe49YZ8sDXPhnRK9Vs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application-json",
          },
          body: JSON.stringify({
            idToken: auth.token,
          }),
        }
      );
      const data = await response.json();
      const user = data.users[0];
      setUserData(user);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    updateVisibleHandler();
  }, []);

  const clickLogoutHandler = () => {
    if(isDarkMode === true){
      dispatch(themeActions.toggleTheme());
    }
    dispatch(authActions.logout());
    dispatch(expenseActions.setItemsEmpty());
    navigate("/", {replace: true});
  };

  const clickExpenseHandler =() => {
    navigate('/profile/expense-tracker', {replace: true});
  }

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
            <h5>
              {userData !== null && userData.displayName !== undefined
                ? userData.displayName
                : "Unknown"}
            </h5>
            <Button
              variant="success"
              onClick={clickExpenseHandler}
              className={classes.expenseBtn}
            >
              ExpenseTracker
            </Button>
          </div>

          <span className={classes.incomplete}> 
            {!isLocation ? (
              "Your Profile is incomplete."
            ) : (
              <React.Fragment>
                Your Profile <strong>x%</strong> completed.
              </React.Fragment>
            )}
            <button onClick={() => navigate('/profile', {replace: true})}>
              Complete now
            </button>
          </span>
          <div>
            <Button variant="danger" onClick={clickLogoutHandler}>
              Log out
            </Button>
          </div>
        </div>
      </section>

      <section className={classes.sectionLower}>
        {isLocation && <UpdateProfileForm user={userData} update={updateVisibleHandler} />}
      </section>
    </Fragment>
  );
};

export default Profile;
