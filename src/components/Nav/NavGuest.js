import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";

const NavGuest = props => (
  <div className="nav">
    <Link to="/home">
      <h2 className="nav-title">Toss Like a Boss</h2>
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? "Home" : "Login"}
      </Link>
      <Link className="nav-link" to="/gamelaunch">
        Game
      </Link>
      <Link className="nav-link" to="/settingsorg">
        Host a Contest
      </Link>

      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          {/* {props.user.wastewise_admin === true && (
            <Link className="nav-link" to="/settingsadmin">
              Admin Settings
            </Link>
          )} */}
          {props.user.username === 'wastewiseadmin@wastewise.com' && (
            <Link className="nav-link" to="/settingsadmin">
              Admin Settings
            </Link>
          )}
          {props.user.username === "mileslacek@gmail.com" && (
            <Link className="nav-link" to="/settingsorg">
              Organization Settings
            </Link>
          )}
          {props.user.wastewise_admin === true && (
            <Link className="nav-link" to="/leaderboard">
              Leaderboard
            </Link>
          )}
          {/* <Link className="nav-link" to="/info">
            Info Page
          </Link> */}
          <Link className="nav-link" to="/resources">
            Resources
          </Link>
          <LogOutButton className="nav-link" />
        </>
      )}
      {/* Always show this link since the about page is not protected */}
      {/* <LogOutButton className="nav-link" /> */}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(NavGuest);
