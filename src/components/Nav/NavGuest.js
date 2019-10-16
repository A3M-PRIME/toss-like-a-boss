import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import Icon from "@mdi/react";
import { mdiDoorOpen } from "@mdi/js";
import { mdiAccount } from "@mdi/js";
import { mdiGamepadSquare } from "@mdi/js";
import { mdiSettingsBox } from "@mdi/js";
import { mdiHelpCircle } from "@mdi/js";
import { mdiClipboardList } from "@mdi/js";
import { mdiAccountPlus } from "@mdi/js";
import { mdiDoorClosedLock } from "@mdi/js";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { withStyles } from "@material-ui/styles";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class NavGuest extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  // handleSetDefaultValue() {
  //   console.log("the url is", window.location.href);
  //   if (window.location.href.includes("home")) {
  //     this.setState({
  //       value: 0
  //     });
  //   } else if (window.location.href.includes("visual")) {
  //     this.setState({
  //       value: 1
  //     });
  //   } else if (window.location.href.includes("live")) {
  //     this.setState({
  //       value: 2
  //     });
  //   } else if (window.location.href.includes("profile")) {
  //     this.setState({
  //       value: 3
  //     });
  //   } else {
  //     this.setState({
  //       value: false
  //     });
  //   }
  // }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Toss Like A Boss" />
            <Tab
              label="LOGIN"
              component={Link}
              to="/home"
              icon={
                <Icon
                  path={mdiDoorOpen}
                  title="Controller Classic"
                  size={3}
                  horizontal
                  rotate={360}
                  color="red"
                />
              }
            />
            <Tab
              label="PLAY GAME"
              component={Link}
              to="/gamelaunch"
              icon={
                <Icon
                  path={mdiGamepadSquare}
                  title="Controller Classic"
                  size={3}
                  horizontal
                  rotate={360}
                  color="red"
                />
              }
            />
            {this.props.user.wastewise_admin && (
              <Tab
                label="Settings"
                component={Link}
                to="/settingsadmin"
                icon={
                  <Icon
                    path={mdiSettingsBox}
                    title="Controller Classic"
                    size={3}
                    horizontal
                    rotate={360}
                    color="red"
                  />
                }
              />
            )}
            {this.props.user.id && !this.props.user.wastewise_admin && (
              <Tab
                label="Settings"
                component={Link}
                to="/settingsorg"
                icon={
                  <Icon
                    path={mdiSettingsBox}
                    title="Controller Classic"
                    size={3}
                    horizontal
                    rotate={360}
                    color="red"
                  />
                }
              />
            )}
            <Tab
              label="Resources"
              component={Link}
              to="/resources"
              icon={
                <Icon
                  path={mdiHelpCircle}
                  title="Controller Classic"
                  size={3}
                  rotate={360}
                  color="red"
                />
              }
            />
            {this.props.user.id && !this.props.user.wastewise_admin && (
              <Tab
                label="Leaderboard"
                component={Link}
                to="/leaderboard"
                icon={
                  <Icon
                    path={mdiClipboardList}
                    title="Controller Classic"
                    size={3}
                    rotate={360}
                    color="red"
                  />
                }
              />
            )}
            <Tab
              label="REGISTER"
              component={Link}
              to="/register"
              icon={
                <Icon
                  path={mdiAccountPlus}
                  title="Controller Classic"
                  size={3}
                  horizontal
                  rotate={360}
                  color="red"
                />
              }
            />
            {this.props.user.id && (
              <Tab
                label="LOGOUT"
                component={Link}
                to="/home"
                icon={
                  <Icon
                    path={mdiDoorClosedLock}
                    title="Controller Classic"
                    size={3}
                    horizontal
                    rotate={360}
                    color="red"
                  />
                }
              />
            )}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

NavGuest.propTypes = {
  classes: PropTypes.object.isRequired
};
//   <div className="nav">
//     <Link to="/home">
//       <h2 className="nav-title">Toss Like a Boss</h2>
//     </Link>
//     <div className="nav-right">
//       {!props.user.id && (
//         <Link className="nav-link" to="/gamelaunch">
//           Game
//         </Link>
//       )}
//       {!props.user.id && (
//         <Link className="nav-link" to="/settingsorg">
//           Host a Contest
//         </Link>
//       )}
//       <Link className="nav-link" to="/home">
//         {/* Show this link if they are logged in or not,
//         but call this link 'Home' if they are logged in,
//         and call this link 'Login / Register' if they are not */}
//         {props.user.id ? "Home" : "Login"}
//       </Link>
//       {/* {!props.user.id && (
//         <Link className="nav-link" to="/gamelaunch">
//           Game
//         </Link>
//       )}
//       {!props.user.id && (
//         <Link className="nav-link" to="/settingsorg">
//           Host a Contest
//         </Link>
//       )} */}

//       {/* Show the link to the info page and the logout button if the user is logged in */}
//       {props.user.id && (
//         <>
//           {/* {props.user.wastewise_admin === true && (
//             <Link className="nav-link" to="/leaderboard">
//               Leaderboard
//             </Link>
//           )} */}
//           {props.user.wastewise_admin === true && (
//             <Link className="nav-link" to="/settingsadmin">
//               Admin Settings
//             </Link>
//           )}
//           {props.user.wastewise_admin === false && (
//             <Link className="nav-link" to="/settingsorg">
//               Organization Settings
//             </Link>
//           )}
//           {/* <Link className="nav-link" to="/info">
//             Info Page
//           </Link> */}
//           <Link className="nav-link" to="/resources">
//             Resources
//           </Link>
//           <LogOutButton className="nav-link" />
//         </>
//       )}
//       {/* Always show this link since the about page is not protected */}
//       {/* <LogOutButton className="nav-link" /> */}
//     </div>
//   </div>
// );

// // Instead of taking everything from state, we just want the user
// // object to determine if they are logged in
// // if they are logged in, we show them a few more links
// // if you wanted you could write this code like this:
// // const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  state,
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(NavGuest));
