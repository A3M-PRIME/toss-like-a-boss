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

    componentDidMount() {
    }

    playAgain = action => {
        this.props.dispatch({
            type: "RESET_CURRENT_GAME_VALUE"
        });
        this.props.dispatch({
            type: 'RESET_GAME_TIME'
        });
        this.props.dispatch({
            type: 'RESET_GAME_SCORE'
        });
        this.props.dispatch({
            type: 'CLEAR_WRONG_ANSWERS'
        });
        this.props.history.push("/gamelaunch");
    };

    handleLeaderboardClick = () => {
        this.props.history.push(`/leaderboard${this.props.history.location.search}`)
    }


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
                        SCORE: {this.props.gameWrongAnswers.length === undefined ? 15 : 15-this.props.gameWrongAnswers.length}/15 {parseInt(((15-this.props.gameWrongAnswers.length)/15)*100)}%
          </Typography>
                </div>
                <div>
                    <Typography variant='h5'>
                        TIME: {this.props.gameTime}
          </Typography>
                </div>
                <div>
                    {this.props.history.location.search && <Button
                    onClick={() => this.handleLeaderboardClick()}
                    >CONTEST LEADERBOARD</Button>}
                </div>
                <div>
                    <ResultsItemCard />
                </div>
                <div>
                    <Button onClick={this.playAgain} variant='contained'>
                        CLICK HERE TO PLAY AGAIN
          </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = reduxStore => {
    return {
        gameScore: reduxStore.gameScoreReducer,
        gameWrongAnswers: reduxStore.gameWrongAnswerReducer,
        gameTime: reduxStore.gameTimeReducer,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(ResultsGuestPlayer));
