import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import ResultsItemCard from "../ResultsItemCard/ResultsItemCard";

const styles = {
  media: {
    width: "100px",
    height: "100px"
  }
};

class ResultsGuestPlayer extends Component {


  playAgain = action => {
    this.props.dispatch({
      type: "RESET_CURRENT_GAME_VALUE"
    });
    this.props.history.push("/gamelaunch");
  };


  render() {
    const scorePercentage = parseInt((this.props.gameScore / 15) * 100);
    console.log(scorePercentage);
    return (
      <div>
        <div>
          <Typography variant='h3'>GAME RESULTS</Typography>
        </div>
        <div>
          <Typography variant='h5'>
            SCORE: {this.props.gameScore}/15 {scorePercentage}%
          </Typography>
        </div>
        <div>
          <ResultsItemCard />
        </div>
        <div>
          <Button onClick={this.playAgain} variant='contained'>
            CLICK HERE TO PLAY AGAIN
          </Button>
        </div>
        <div>
          <Button variant='contained'>CHECK OUT THE LEADERBOARD</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    gameScore: reduxStore.gameScoreReducer
  };
};

export default connect(mapStateToProps)(withStyles(styles)(ResultsGuestPlayer));
