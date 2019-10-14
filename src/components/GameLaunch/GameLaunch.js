import React, { Component } from "react";
import { connect } from "react-redux";
import CompostBinChoice from '../CompostBinChoice/CompostBinChoice';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)

const styles = {
  HowToPlayButton: {
    backgroundColor: "green",
    color: "white",
    border: "2px solid black",
    fontSize: "calc(10px + 2vmin)",
    padding: "5px",
    margin: "50px",
    "&:hover": {
      // change to both KEY and the
      // textDecoration: "underline",
      backgroundColor: "yellow",
      color: "black"
    }
  },
  PlayButton: {
    backgroundColor: "green",
    color: "white",
    border: "2px solid black",
    fontSize: "calc(10px + 2vmin)",
    padding: "50px",
    margin: "50px",
    "&:hover": {
      // change to both KEY and the
      // textDecoration: "underline",
      backgroundColor: "yellow",
      color: "black"
    }
  },
  background: {
    backgroundImage: "url(/images/Forest.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: 900,
    margin: -24,
    padding: 24
  }
};

class GameLaunch extends Component {
  state = {
    timeToPlay: false,
    email: '',
    firstName: '',
    lastName: '',
    contestPlayReady: false
  }
  componentDidMount() {
    //this will get the id of the contest game from url params
    let contestBoolean = this.props.history.location.search.split('=').pop();
    console.log('contest boolean is', contestBoolean)
    //if this is a contest game, send dispatch to find whether game has compost or not
    this.props.history.location.search && 
    this.props.dispatch({
      type: 'GET_CONTEST_COMPOST_BOOLEAN',
      payload: contestBoolean
    })
  }

  // route the user back to the how to play page
  howToPlay = () => {
    this.props.history.push('/howtoplay')
  }
  // route the user back to the gamelaunch page
  toGame = () => {
    this.setState({
      timeToPlay: true
    })
    console.log(this.state)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    MySwal.fire({
      title: `Are you sure you are ready? You only get one
      chance to play to record a score!`,
      text: `You can practice all you want by clicking the Play
      button to the left.`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `I'm ready to go!`
    }).then((result) => {
      if (result.value) {
        this.props.dispatch({
          type: 'SET_SCORE_PERSONAL_INFO',
          payload: this.state
        })
        //hits reducer to remove compost bin from game if contest has no compost
        if (!this.props.contestCompostBooleanReducer) {
          this.props.dispatch({
            type: 'NO_COMPOST_BIN'
          })
        }
        this.props.history.push(`/game${this.props.history.location.search}`)
      }
    })
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
          <br></br>
          <body className={this.props.classes.background}>
            <Grid
              container
              justify={"space-evenly"}
              spacing={24}
              alignItems={"center"}
            >
              <Grid item xs={3}>
                <Button
                  className={this.props.classes.HowToPlayButton}
                  onClick={this.howToPlay}
                >
                  How To Play
                </Button>
              </Grid>
            </Grid>
            <br></br>
            <Grid
              container
              justify={"space-evenly"}
              spacing={24}
              alignItems={"center"}
            >
              <Grid item xs={3}>
                <Button
                  className={this.props.classes.PlayButton}
                  onClick={this.toGame}
                >
                  PLAY!
                </Button>
                {/* conditionally render CompostBinChoice when play is clicked */}
                {this.state.timeToPlay && <CompostBinChoice />}
              </Grid>
              {this.props.history.location.search && (
                <Grid item xs={3}>
                  <form onSubmit={this.handleSubmit}>
                    <TextField
                      required
                      label="Email Address"
                      type="email"
                      value={this.state.email}
                      onChange={this.handleChange("email")}
                    />
                    <TextField
                      required
                      label="First Name"
                      value={this.state.firstName}
                      onChange={this.handleChange("firstName")}
                    />
                    <TextField
                      required
                      label="Last Name"
                      value={this.state.lastName}
                      onChange={this.handleChange("lastName")}
                    />

                    <Button
                      type="submit"
                      className={this.props.classes.PlayButton}
                      // onClick={() => this.props.history.push(`/game${this.props.history.location.search}`)}
                    >
                      CONTEST PLAY!
                    </Button>
                  </form>
                </Grid>
              )}
            </Grid>
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
    compostBoolean: reduxStore.contestCompostBooleanReducer
  }
}

// exports the component
export default connect(mapStateToProps)(withStyles(styles)(GameLaunch));