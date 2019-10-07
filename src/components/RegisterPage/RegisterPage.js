import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Box, Card, CardContent, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    textAlign: 'center',
    background: '#494A49',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldMedium: {
    margin: 5,
    width: 240,
    '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
      borderColor: "black"
    }
  },
  fieldLarge: {
    margin: 5,
    width: 490,
    '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
      borderColor: "black"
    }
  },
  radio: {
    margin: theme.spacing(3)
  },
  input: {
    color: "black"
  },
  cssLabel: {
    '&$cssFocused': {
      color: "black",
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: "black",
    },
  },
  cssFocused: {},
  notchedOutline: { borderColor: "black" },
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

    let hourSelection = []

    for (let i = 0; i < 24; i++) {
      let hourFormat = {
        displayValue: 0,
        sqlValue: 0
      }
      hourFormat.sqlValue = i;
      if (i == 0) {
        hourFormat.displayValue = '12 am'
        hourSelection.push(hourFormat);
      } else if (i < 12) {
        hourFormat.displayValue = i + ' am'
        hourSelection.push(hourFormat);
      } else if (i == 12) {
        hourFormat.displayValue = '12 pm'
        hourSelection.push(hourFormat)
      } else if (i <= 23) {
        let j = i;
        hourFormat.displayValue = j - 12 + ' pm'
        hourSelection.push(hourFormat);
      }
    }

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
                    <h1>Registration</h1>

                    <div>
                      <TextField
                        align="left"
                        id="outlined-name"
                        label="first name"
                        className={classes.fieldMedium}
                        value={this.state.firstName}
                        onChange={this.handleInputChangeFor('firstName')}
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
                      <TextField
                        align="left"
                        id="outlined-name"
                        label="last name"
                        className={classes.fieldMedium}
                        value={this.state.lastName}
                        onChange={this.handleInputChangeFor('lastName')}
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
                      <TextField
                        align="left"
                        id="outlined-name"
                        label="email address"
                        className={classes.fieldLarge}
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
                      <TextField
                        type="password"
                        align="left"
                        id="outlined-name"
                        label="password"
                        className={classes.fieldMedium}
                        value={this.state.password}
                        onChange={this.handleInputChangeFor('password')}
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
                      <TextField
                        type="password"
                        align="left"
                        id="outlined-name"
                        label="confirm password"
                        className={classes.fieldMedium}
                        value={this.state.confirmPassword}
                        onChange={this.handleInputChangeFor('confirmPassword')}
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
                    <br/><br/>
                    <div>
                      <TextField
                        align="left"
                        id="outlined-name"
                        label="organization name"
                        className={classes.fieldLarge}
                        value={this.state.organizationName}
                        onChange={this.handleInputChangeFor('organizationName')}
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
                      <TextField
                        align="left"
                        id="outlined-name"
                        label="name your contest"
                        className={classes.fieldLarge}
                        value={this.state.contestName}
                        onChange={this.handleInputChangeFor('contestName')}
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
                      <FormControl component="fieldset" className={classes.radio}>
                        <FormLabel component="legend">Should your game include an option for a compost bin?</FormLabel>
                        <RadioGroup aria-label="compost bin" name="compostBin" onChange={this.handleInputChangeFor('compostBin')}>
                          <FormControlLabel value="true" control={<Radio />} label="Yes" />
                          <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                    <div>
                      <TextField
                        type="date"
                        align="left"
                        id="outlined-name"
                        label="contest start date"
                        className={classes.fieldMedium}
                        value={this.state.contestStartDate}
                        onChange={this.handleInputChangeFor('contestStartDate')}
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
                      <TextField
                        align="left"
                        id="outlined-name"
                        select
                        label="contest start time"
                        className={classes.fieldMedium}
                        value={this.state.contestStartTime}
                        onChange={this.handleInputChangeFor('contestStartTime')}
                        SelectProps={{
                          MenuProps: {
                            className: classes.status,
                          },
                        }}
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
                      >
                        {hourSelection.map((hour) =>
                          <MenuItem key={hour.sqlValue} value={hour.sqlValue} className={classes.timeOptions}>
                            {hour.displayValue}
                          </MenuItem>
                        )}
                      </TextField>
                    </div>
                    {/* <div>
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
                    </div> */}
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