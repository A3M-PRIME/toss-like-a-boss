import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Box, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    textAlign: 'center',
    background: '#494A49',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldMedium: {
    width: 300,
    '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
      borderColor: "white"
    }
  },
  input: {
    color: "white"
  },
  cssLabel: {
    '&$cssFocused': {
      color: "white",
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: "white",
    },
  },
  cssFocused: {},
  notchedOutline: { borderColor: "white" },
  h1: {
    color: "#55d685"
  }
}
)

class RegisterPage extends Component {

  state = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    organizationName: '',
    contestName: '',
    compostBin: false,
    contestStartDate: '',
    contestStartTime: '',
    contestEndDate: '',
    contestEndTime: ''
  };

  registerUser = (event) => {

    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {

    const { classes } = this.props

    return (
      <Box textAlign="center">
        <div style={{ marginTop: 90, padding: 30 }}>
          <Grid container spacing={2} justify="center" style={{ marginTop: 6 }}>
            <Grid item sm={5}>
              <Card>
                <CardContent>
                  {this.props.errors.registrationMessage && (
                    <h2
                      className="alert"
                      role="alert"
                    >
                      {this.props.errors.registrationMessage}
                    </h2>
                  )}
                  <form onSubmit={this.registerUser}>
                    <h1>Register User</h1>

                    <div>
                      <TextField
                        align="left"
                        id="outlined-name"
                        label="login"
                        className={classes.login}
                        value={this.state.username}
                        onChange={this.handleInputChangeFor('username')}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          className: classes.input,
                          classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                          }
                        }}
                        InputLabelProps={{
                          className: classes.input,
                          shrink: true
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor="username">
                        Username:
              <input
                          type="text"
                          name="username"
                          value={this.state.username}
                          onChange={this.handleInputChangeFor('username')}
                        />
                      </label>
                    </div>
                    <div>
                      <label htmlFor="password">
                        Password:
              <input
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleInputChangeFor('password')}
                        />
                      </label>
                    </div>
                    <div>
                      <input
                        className="register"
                        type="submit"
                        name="submit"
                        value="Register"
                      />
                    </div>
                  </form>
                  <center>
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
                    >
                      Login
          </button>
                  </center>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Box>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(RegisterPage)));