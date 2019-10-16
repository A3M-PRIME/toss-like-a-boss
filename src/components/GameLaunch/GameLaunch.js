import React, { Component } from "react";
import { connect } from "react-redux";
import CompostBinChoice from "../CompostBinChoice/CompostBinChoice";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Help from "@material-ui/icons/Help";
import PlayArrow from "@material-ui/icons/PlayArrow";

const MySwal = withReactContent(Swal);

const styles = {
  HowToPlayButton: {
    backgroundColor: "#002650",
    color: "white",
    border: "2px solid black",
    fontSize: "calc(15px + 2vmin)",
    padding: "5px",
    margin: "50px",
    "&:hover": {
      // change to both KEY and the
      // textDecoration: "underline",
      backgroundColor: "#3a6ca2",
      color: "black"
    }
  },
  PlayButton: {
    backgroundColor: "#002650",
    color: "white",
    border: "2px solid black",
    fontSize: "calc(35px + 2vmin)",
    padding: "10px auto 10px auto",
    margin: "50px",
    width: "50%",
    "&:hover": {
      // change to both KEY and the
      // textDecoration: "underline",
      backgroundColor: "#3a6ca2",
      color: "black"
    }
  },
  contestPlayButton: {
    backgroundColor: "#002650",
    color: "white",
    border: "2px solid black",
    fontSize: "calc(35px + 2vmin)",
    padding: "10px 70px 10px 70px",
    margin: "50px",
    width: "65%",
    "&:hover": {
      // change to both KEY and the
      // textDecoration: "underline",
      backgroundColor: "#3a6ca2",
      color: "black"
    }
  },
  background: {
    backgroundImage: "url(/images/Forest.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: 1200,
    margin: -24,
    padding: 24,
    textAlign: "center",
    display: "block"
  },
  contestForm: {
    backgroundColor: "grey",
    borderRadius: "25px",
    margin: "5px",
    maxWidth: "450px",
    display: "inline-block",
    marginLeft: "auto",
    marginRight: "auto"
  },
  formInputs: {
    padding: 5,
    margin: 5
  },
  teamSelect: {
    width: "30%"
  },
  svgIcon: {
    fontSize: "calc(35px + 2vmin)"
  },
  gridContainer: {
    display: "inline-block"
  }
};

class GameLaunch extends Component {
  state = {
    timeToPlay: false,
    email: "",
    firstName: "",
    lastName: "",
    contestPlayReady: false,
    teamName: ""
  };
  componentDidMount() {
    //this will get the id of the contest game from url params
    let contestIdNumber = this.props.history.location.search.split("=").pop();
    //if this is a contest game, send dispatch to find whether game has compost or not
    this.props.history.location.search &&
      this.props.dispatch({
        type: "GET_CONTEST_COMPOST_BOOLEAN",
        payload: contestIdNumber
      });

    this.handleTeamNames();
  }

  //gets team names from database to populate dropdown
  handleTeamNames = () => {
    let contestIdNumber = this.props.history.location.search.split("=").pop();
    this.props.dispatch({
      type: "GET_TEAM_NAMES",
      payload: contestIdNumber
    });
  };

  // route the user back to the how to play page
  howToPlay = () => {
    this.props.history.push("/howtoplay");
  };
  // route the user back to the gamelaunch page
  toGame = () => {
    this.setState({
      timeToPlay: true
    });
    console.log(this.state);
  };

  handleSubmit = event => {
    event.preventDefault();
    MySwal.fire({
      title: `Are you sure you are ready? You only get one
      chance to play to record a score!`,
      text: `You can practice all you want by clicking the Play
      button to the left.`,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `I'm ready to go!`
    }).then(result => {
      if (result.value) {
        this.props.dispatch({
          type: "SET_SCORE_PERSONAL_INFO",
          payload: this.state
        });
        //hits reducer to remove compost bin from game if contest has no compost
        if (!this.props.compostBoolean[0].compost) {
          this.props.dispatch({
            type: "NO_COMPOST_BIN"
          });
        }
        this.props.history.push(`/game${this.props.history.location.search}`);
      }
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    console.log(this.state);

    let teamNameArray = this.props.teamNames.map(name => {
      return <MenuItem value={name.team_name}>{name.team_name}</MenuItem>;
    });

    return (
      <div>
        <br></br>
        <body className={this.props.classes.background}>
          <div className={this.props.classes.gridContainer}>
            <Grid
              container
              justify={"space-evenly"}
              spacing={3}
              alignItems={"center"}
              alignContent={"center"}>
              <Grid item xs={12} className={this.props.classes.gridContainer}>
                <Button
                  className={this.props.classes.HowToPlayButton}
                  onClick={this.howToPlay}>
                  <Help />
                  How To Play
                </Button>
              </Grid>
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <Button
                className={this.props.classes.PlayButton}
                onClick={this.toGame}>
                <PlayArrow className={this.props.classes.svgIcon} />
                PLAY!
              </Button>
              {/* conditionally render CompostBinChoice when play is clicked */}
              {this.state.timeToPlay && <CompostBinChoice />}
            </Grid>

            {this.props.history.location.search && (
              <Grid item xs={4}>
                <form
                  className={this.props.classes.contestForm}
                  onSubmit={this.handleSubmit}>
                  <h2>Fill out form fields for contest entry</h2>
                  <FormControl className={this.props.classes.formInputs}>
                    <TextField
                      required
                      label='Email Address'
                      type='email'
                      value={this.state.email}
                      onChange={this.handleChange("email")}
                    />
                    <TextField
                      required
                      label='First Name'
                      value={this.state.firstName}
                      onChange={this.handleChange("firstName")}
                    />
                    <TextField
                      required
                      label='Last Name'
                      value={this.state.lastName}
                      onChange={this.handleChange("lastName")}
                    />
                  </FormControl>
                  {/* CONDITIONALLY RENDER TEAM NAME SELECTOR
                  IF THERE ARE TEAM NAMES IN REDUCER */}
                  {this.props.teamNames[0] ? (
                    <FormControl
                      required
                      className={this.props.classes.teamSelect}>
                      <InputLabel>Team Select</InputLabel>
                      <Select
                        label='Team Name'
                        value={this.state.teamName}
                        onChange={this.handleChange("teamName")}>
                        <MenuItem default value='None'>
                          <em>Select Team</em>
                        </MenuItem>
                        {/* CONDITIAIONLLY RENDER ARRAY IF THERE ARE TEAM NAMES */}
                        {this.props.teamNames && teamNameArray}
                      </Select>
                    </FormControl>
                  ) : (
                    <></>
                  )}
                  <Button
                    type='submit'
                    className={this.props.classes.contestPlayButton}
                    // onClick={() => this.props.history.push(`/game${this.props.history.location.search}`)}
                  >
                    CONTEST PLAY!{" "}
                    <PlayArrow className={this.props.classes.svgIcon} />
                  </Button>
                </form>
              </Grid>
            )}
          </div>
        </body>
        <br></br>
      </div>
    );
  }
}

//mapping the state to props
const mapStateToProps = reduxStore => {
  return {
    reduxStore,
    compostBoolean: reduxStore.contestCompostBooleanReducer,
    teamNames: reduxStore.organizationTeamNameReducer
  };
};

// exports the component
export default connect(mapStateToProps)(withStyles(styles)(GameLaunch));
