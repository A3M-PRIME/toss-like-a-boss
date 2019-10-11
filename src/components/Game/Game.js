import React, { Component } from "react";
import { connect } from "react-redux";
import GarbageBin from "../GarbageBin/GarbageBin";
import CompostBin from "../CompostBin/CompostBin";
import RecycleBin from "../RecycleBin/RecycleBin";
import DraggableItem from "../DraggableItem/DraggableItem";

//Material UI Components
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const styles = {
  Button: {
    backgroundColor: "green",
    color: "white",
    border: "2px solid black",
    fontSize: "calc(10px + 2vmin)"
  },
  bin: {
    width: "100px",
    height: "100px",
    backgroundColor: "red",
    border: "1px solid black",
    float: "left",
    margin: "5px"
  },
  item: {
    width: "50px",
    height: "50px",
    backgroundColor: "green",
    border: "1px solid black",
    padding: "5px",
    margin: "50px",
    "&:hover": {
      // change to both KEY and the
      // textDecoration: "underline",
      backgroundColor: "yellow",
      color: "black"
    }
  }
};

class Game extends Component {
  state = {
    score: 0,
    time: 0,
    firstTry: true
  };

  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_GAME_ITEMS"
    });
  }

  handleTimerStart = () => {
    console.log("start a timer");
    this.timer = setInterval(
      () =>
        this.setState({
          time: this.state.time + 1
        }),
      1000
    );
  };

  // route the user back to the home page
  backToHome = () => {
    this.props.history.push("/");
  };

  // route the user back to the how to play page
  howToPlay = () => {
    this.props.history.push("/howtoplay");
  };

  toReady = () => {
    this.props.history.push("/gamelaunch");
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <div>
          <header>
            <Grid
              container
              justify={"space-evenly"}
              spacing={12}
              alignItems={"center"}>
              <h1>WASTE-WISE-R</h1>
              {/* conditionally render items remaining based on length of array, use 0 if no items */}
              <h3>
                items remaining :
                {this.props.gameItems.length ? this.props.gameItems.length : 0}
              </h3>{" "}
              <h3>Elapsed Time showing : {this.state.time}</h3>
              <div className={this.props.classes.h1}>
                <Grid
                  container
                  justify={"space-evenly"}
                  spacing={10}
                  alignItems={"center"}></Grid>
              </div>
            </Grid>
          </header>
        </div>

        <div>
          <Grid
            container
            justify={"space-evenly"}
            spacing={6}
            alignItems={"center"}>
            <Button
              className={this.props.classes.Button}
              onClick={this.howToPlay}>
              How To Play
            </Button>
            <h2>Score : {this.state.score}</h2>
            <Button
              className={this.props.classes.Button}
              onClick={this.backToHome}>
              Back To Home
            </Button>
          </Grid>
          <br />
          <Grid
            container
            justify={"space-evenly"}
            spacing={48}
            alignItems={"center"}>
            <Button
              className={this.props.classes.Button}
              onClick={() => this.handleTimerStart()}>
              {" "}
              READY?!{" "}
            </Button>
          </Grid>
          <Grid>
            <div>
              <div>
                {/* id={this.props.gameItems[0].id} */}
                {this.props.gameItems[this.props.currentGameValue]
                  .receptacle === "compost" && !this.props.compostBin ? (
                  this.props.gameItems[this.props.currentGameValue]
                    .receptacle && (
                    <DraggableItem
                      name={"garbage"}
                      label={
                        this.props.gameItems[this.props.currentGameValue].name
                      }
                      itemId={
                        this.props.gameItems &&
                        this.props.gameItems[this.props.currentGameValue].id
                      }
                    />
                  )
                ) : (
                  <DraggableItem
                    name={
                      this.props.gameItems[this.props.currentGameValue]
                        .receptacle
                    }
                    label={
                      this.props.gameItems[this.props.currentGameValue].name
                    }
                    itemId={
                      this.props.gameItems &&
                      this.props.gameItems[this.props.currentGameValue].id
                    }
                  />
                )}
              </div>
            </div>
          </Grid>
        </div>
        <footer>
          <Grid
            container
            justify={"space-evenly"}
            spacing={48}
            alignItems={"center"}>
            <div>
              <GarbageBin />
            </div>
            <div>
              <RecycleBin />
            </div>
            <div>{this.props.compostBin && <CompostBin />}</div>
          </Grid>
        </footer>
      </div>
    );
  }
}

// mapping the state to props
const mapStateToProps = reduxStore => {
  return {
    reduxStore,
    gameItems: reduxStore.gameItemsReducer,
    compostBin: reduxStore.compostBinReducer,
    currentGameValue: reduxStore.currentGameValueReducer
  };
};

//exports the component
export default connect(mapStateToProps)(withStyles(styles)(Game));
