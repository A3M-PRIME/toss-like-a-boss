import React, { Component } from "react";
import { connect } from "react-redux";
import GarbageBin from "../GarbageBin/GarbageBin";
import CompostBin from "../CompostBin/CompostBin";
import RecycleBin from "../RecycleBin/RecycleBin";
import DraggableItem from "../DraggableItem/DraggableItem";
import IncorrectSnackBar from "./IncorrectSnackBar";
import CorrectSnackBar from "./CorrectSnackBar";
import Typography from '@material-ui/core/Typography';

//Material UI Components
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
//animation components
import styled, { keyframes } from "styled-components";
import { shake, bounce } from "react-animations";

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
  },
  background: {
    backgroundImage: "url(/images/Lake.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: 900,
    padding: 24
    // opacity: 0.7,
  },
  scoreboard: {
    fontFamily: 'scoreboard',
    color: 'gold',
    blur: 20,
    padding: 4,
    margin: 'auto',
    textAlign: 'center'
  },
  scoreboardBackground: {
    backgroundColor: 'black',
    width: 500,
    borderRadius: 10,
    border: '2px solid gold'
  },
  scoreboardHolder: {
    display: 'flex',
    justifyContent: 'center'
  },
  scoreboardSmallText: {
    fontFamily: 'scoreboard',
    color: 'gold',
    blur: 20,
    padding: 4,
    margin: 'auto',
    textAlign: 'center',
    fontSize: 30
  },
  timerText: {

  }
};

const Shake = styled.div`
  animation: 0.75s ${keyframes`${shake}`};
`;
const Bounce = styled.div`
  animation: 0.75s ${keyframes`${bounce}`};
`;

class Game extends Component {
  state = {
    score: 0,
    time: 0,
    firstTry: true,
    gameStarted: false
  };

  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_GAME_ITEMS"
    });
  }

  handleTimerStart = () => {
    console.log("start a timer");
    this.setState({
      gameStarted: true
    });

    this.timer = setInterval(
      () =>
        this.setState({
          time: this.state.time + 1
        }),
      1000
    );
  };

  goToResults = () => {
    if (this.props.currentGameValue > this.props.gameItemsReducer.length - 1) {
      this.props.history.push("/results");
    }
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
    console.log(this.props);
    return (
      <div className={this.props.classes.background}>
        <div className={this.props.classes.scoreboardHolder}>
          <header className={this.props.classes.scoreboardBackground}>
            <div>
              <Grid
                container>
                <Typography className={this.props.classes.scoreboard} variant="h1">
                  Score : {this.props.gameScore}
                </Typography>
              </Grid>
              <Grid
              container
              justify={"space-evenly"}
              spacing={12}
              alignItems={"center"}>
              {/* conditionally render items remaining based on length of array, use 0 if no items */}
                <Typography className={this.props.classes.scoreboardSmallText}>Items Remaining:{15 - this.props.currentGameValue}
                </Typography>
                <Typography className={this.props.classes.scoreboardSmallText}>Elapsed Time: 
                <span className={this.props.classes.timerText}>{this.state.time}</span>
                </Typography>
            </Grid>
            </div>
          </header>
        </div>

        <div>
          <br />
          <Grid
            container
            justify={"space-evenly"}
            spacing={48}
            alignItems={"center"}>
            {!this.state.gameStarted && (
              <Button
                className={this.props.classes.Button}
                onClick={() => this.handleTimerStart()}>
                READY?!
              </Button>
            )}
          </Grid>
          <Grid>
            <div>
              <div className={this.props.classes.gameItem}>
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
                      goToResults={this.goToResults}
                    />
                  )
                ) : (
                  <DraggableItem
                    backgroundImageURL={
                      this.props.gameItems[this.props.currentGameValue].url
                    }
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
                    goToResults={this.goToResults}
                    gameTime={this.state.time}
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
            {this.props.garbageAnimate === 1 ? <GarbageBin /> : null}
            {this.props.garbageAnimate === 2 ? (
              <Bounce>
                <GarbageBin />
              </Bounce>
            ) : null}
            {this.props.garbageAnimate === 3 ? (
              <Shake>
                <GarbageBin />
              </Shake>
            ) : null}
            {/* Conditional Render of recycle bins with animations*/}
            {this.props.recycleAnimate === 1 ? <RecycleBin /> : null}
            {this.props.recycleAnimate === 2 ? (
              <Bounce>
                <RecycleBin />
              </Bounce>
            ) : null}
            {this.props.recycleAnimate === 3 ? (
              <Shake>
                <RecycleBin />
              </Shake>
            ) : null}

            {this.props.compostBin === true &&
            this.props.compostAnimate === 1 ? (
              <CompostBin />
            ) : null}
            {this.props.compostBin === true &&
            this.props.compostAnimate === 2 ? (
              <Bounce>
                <CompostBin />
              </Bounce>
            ) : null}
            {this.props.compostBin === true &&
            this.props.compostAnimate === 3 ? (
              <Shake>
                <CompostBin />
              </Shake>
            ) : null}
          </Grid>
          <CorrectSnackBar />
          <IncorrectSnackBar />
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
    currentGameValue: reduxStore.currentGameValueReducer,
    gameScore: reduxStore.gameScoreReducer,
    garbageAnimate: reduxStore.animateGarbageReducer,
    recycleAnimate: reduxStore.animateRecycleReducer,
    compostAnimate: reduxStore.animateCompostReducer
  };
};

//exports the component
export default connect(mapStateToProps)(withStyles(styles)(Game));
