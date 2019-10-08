import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const styles = {
  Button: {
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
  // h1: {
  //   border: "2px solid black",
  //   width: "100%",
  //   margin: "20px",
  //   padding: "40px"
  // },
  trash: {
    border: "2px solid black",
    width: "25%",
    margin: "20px",
    padding: "40px",
  },
  recycle: {
    border: "2px solid black",
    width: "25%",
    margin: "20px",
    padding: "40px"
  },
  compost: {
    border: "2px solid black",
    width: "25%",
    margin: "20px",
    padding: "40px"
  },
};

class GameLaunch extends Component {

  toContest = () => {
    this.props.history.push('/')
  }

  toLogin = () => {
    this.props.history.push('/login')
  }

  // route the user back to the home page
  backToHome = () => {
    this.props.history.push('/'); 
  };

  // route the user back to the how to play page
  howToPlay = () => {
    this.props.history.push('/howtoplay')
  }

  toReady = () => {
    this.props.history.push('/gamelaunch')
  }

    render() {
        return (
          <div>
            {/* <Grid
              container
              justify={"space-evenly"}
              spacing={12}
              alignItems={"center"}
            >
              <div className={this.props.classes.h1}>
                <Grid
                  container
                  justify={"space-evenly"}
                  spacing={10}
                  alignItems={"center"}
                >
                  <h1>WASTE-WISE-R</h1>
                  <h3>items remaining : 15</h3>{" "}
                  <h3>Elapsed Time showing : 0:00</h3>
                </Grid>
              </div>
            </Grid> */}
            <br></br>
            <body>
              <Grid
                container
                justify={"space-evenly"}
                spacing={6}
                alignItems={"center"}
              >
                <Grid item xs={3}>
                  <Button
                    className={this.props.classes.Button}
                    onClick={this.howToPlay}
                  >
                    How To Play
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    className={this.props.classes.Button}
                    onClick={this.backToHome}
                  >
                    Back To Home
                  </Button>
                </Grid>
              </Grid>
              <br></br>
              <Grid
                container
                justify={"space-evenly"}
                spacing={48}
                alignItems={"center"}
              >
                <Grid item xs={2}>
                <Button className={this.props.classes.Button} onClick>
                  PLAY!
                </Button>
                </Grid>
              </Grid>
            </body>
            <br></br>
            <Grid
              container
              justify={"space-evenly"}
              spacing={12}
              alignItems={"center"}
            >
              <Grid item xs={3}>
                <Button
                  className={this.props.classes.Button}
                  onClick={this.toContest}
                >
                  HOST A CONTEST
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  className={this.props.classes.Button}
                  onClick={this.toLogin}
                >
                  LOGIN TO YOUR ADMIN ACCOUNT
                </Button>
              </Grid>
            </Grid>
            {/* <footer>
              <Grid
                container
                justify={"space-evenly"}
                spacing={12}
                alignItems={"center"}
              >
                <div className={this.props.classes.trash}>Trash/Garbage</div>
                <div className={this.props.classes.recycle}>Recycle</div>
                <div className={this.props.classes.compost}>Compost</div>
              </Grid>
            </footer> */}
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