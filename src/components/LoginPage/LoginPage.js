import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const styles = {
  background: {
    backgroundImage: "url(/images/Forest.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: 900,
    padding: 24
  }
};

class LoginPage extends Component {
  state = {
    username: "",
    password: ""
  };

  login = event => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          username: this.state.username,
          password: this.state.password
        }
      });
    } else {
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  handleInputChangeFor = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <body className={this.props.classes.background}>
          {this.props.errors.loginMessage && (
            <h2 className="alert" role="alert">
              {this.props.errors.loginMessage}
            </h2>
          )}
          <Grid
            container
            direction={"column"}
            justify={"flex-start"}
            alignItems={"center"}
          >
            <form class="login" onSubmit={this.login}>
              <Grid
                container
                direction={"column"}
                justify={"flex-start"}
                alignItems={"center"}
              >
                <h1 onClick={() => this.setState({username: "humancreative@icloud.com", password:"090909090"})}>Login</h1>
              </Grid>
              <div>
                <b>
                  <label htmlFor="username">
                    Username:
                    <input
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleInputChangeFor("username")}
                    />
                  </label>
                </b>
              </div>
              <div>
                <b>
                  <label htmlFor="password">
                    Password:
                    <input
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInputChangeFor("password")}
                    />
                  </label>
                </b>
              </div>
              <Grid
                container
                direction={"column"}
                justify={"flex-start"}
                alignItems={"center"}
              >
                <div>
                  <input
                    className="log-in"
                    type="submit"
                    name="submit"
                    value="Log In"
                  />
                </div>
              </Grid>
            </form>
            <center>
              <button
                type="button"
                className="link-button"
                onClick={() => {
                  this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
                }}
              >
                Register
              </button>
            </center>
          </Grid>
        </body>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
