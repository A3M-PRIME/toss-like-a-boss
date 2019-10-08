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
  h1: {
    border: "2px solid black",
    width: "100%",
    margin: "20px",
    padding: "40px"
  },
};

class GameLaunch extends Component {
    render() {
        return (
          <div>
            <Grid
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
            </Grid>
            <body>
              <Grid
                container
                justify={"space-evenly"}
                spacing={6}
                alignItems={"center"}
              >
                <Button
                  className={this.props.classes.Button}
                  onClick={this.howToPlay}
                >
                  How To Play
                </Button>
                <h2>Score : 0</h2>
                <Button
                  className={this.props.classes.Button}
                  onClick={this.backToHome}
                >
                  Back To Home
                </Button>
              </Grid>
              <br></br>
              <Grid
                container
                justify={"space-evenly"}
                spacing={48}
                alignItems={"center"}
              >
                <Button className={this.props.classes.Button} onClick>
                  READY?!
                </Button>
              </Grid>
            </body>
            {/* {JSON.stringify(this.props.reduxStore)} */}
            <footer>
              <Grid
                container
                justify={"space-evenly"}
                spacing={48}
                alignItems={"center"}
              >
                <div className={this.props.classes.bin}>Trash/Garbage</div>
                <div className={this.props.classes.bin}>Recycle</div>
                <div className={this.props.classes.bin}>Compost</div>
              </Grid>
            </footer>
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