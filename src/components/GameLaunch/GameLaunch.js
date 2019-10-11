import React, { Component } from "react";
import CompostBinChoice from '../CompostBinChoice/CompostBinChoice';
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

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
};

class GameLaunch extends Component {
  state = {
    timeToPlay: false,
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

  render() {
    return (
      <div>
        <br></br>
        <body>
          <Grid
            container
            justify={"space-evenly"}
            spacing={12}
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
            spacing={12}
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
    reduxStore
  }
}

// exports the component
export default connect(mapStateToProps)(withStyles(styles)(GameLaunch));