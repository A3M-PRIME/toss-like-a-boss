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
  question: {
    fontSize: 20
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
    contestEndTime: '',
    accessCode: ''
  };

  registerUser = (event) => {

    event.preventDefault();

    this.passwordValidation();

    this.generateAccessId();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          username: this.state.username,
          password: this.state.password,
          organizationName: this.state.organizationName,
          contestName: this.state.contestName,
          compostBin: this.state.compostBin,
          contestStartDate: this.state.contestStartDate,
          contestStartTime: this.state.contestStartTime,
          contestEndDate: this.state.contestEndDate,
          contestEndTime: this.state.contestEndTime,
          accessCode: this.state.accessCode
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

  generateAccessId() {
    this.state.accessCode = Math.floor(Math.random() * 900000000) + 100000000;
  }

  passwordValidation() {
    if (this.state.password.length < 8) {
      alert('Please ensure your password is at least eight characters.');
      return false;
    }
    if (this.state.password !== this.state.confirmPassword) {
      alert('The passwords do not match.  Please try again.');
      return false;
    }
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
        <div className={classes.root} style={{ marginTop: 25, padding: 30 }}>
          <Grid container spacing={2} justify="center">
            <Grid item sm={8}>
              <Card>
                <CardContent>
                  <span className={classes.question}><b>Invited to play?</b></span>
                  <br/>
                  There's no need to register!  Please use the link provided by your organization.
                  <br/><br/>
                  <span className={classes.question}><b>Represent an organization?</b></span>
                  <br/>
                  You're in the right place!  Register for an account to begin setting up your contest.
                </CardContent>
              </Card>
            </Grid>   
            </Grid>
          <Grid container spacing={2} justify="center" style={{ marginTop: 10}}>
            <Grid item sm={8}>
              <Card>
                <CardContent style={{ backgroundColor: "#EEF1F1"}}>
                  {this.props.errors.registrationMessage && (
                    <h2
                      className="alert"
                      role="alert"
                    >
                      {this.props.errors.registrationMessage}
                    </h2>
                  )}
                  <form onSubmit={this.registerUser}>
                    <h1>Organization Registration</h1>
                    <h3>Your Information</h3>
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
                    <br /><br />
                      <h3>Contest Information</h3>
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
                        <FormLabel component="legend" style={{color: "black"}}>Should your game include an option for a compost bin?</FormLabel>
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
                    <div>
                      <TextField
                        type="date"
                        align="left"
                        id="outlined-name"
                        label="contest end date"
                        className={classes.fieldMedium}
                        value={this.state.contestEndDate}
                        onChange={this.handleInputChangeFor('contestEndDate')}
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
                        label="contest end time"
                        className={classes.fieldMedium}
                        value={this.state.contestEndTime}
                        onChange={this.handleInputChangeFor('contestEndTime')}
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
                    <br />
                    <div>
                      <div>
                      <Button variant="contained" color="primary" type="submit" name="submit" value="Register">
                        Register
                      </Button>
                      </div>
                      <br/>
                      <div>
                      <Button variant="contained" color="secondary" value="Login" onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}>
                        Back to Login
                      </Button>
                      </div>
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