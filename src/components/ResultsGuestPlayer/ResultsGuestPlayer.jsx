import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';

import ResultsItemCard from "../ResultsItemCard/ResultsItemCard";

const styles = {
    media: {
        width: "100px",
        height: "100px"
    },
    background: {
        backgroundImage: "url(/images/River.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: 900,
        padding: 24
    },
    scoreText: {
        padding: 10,
        margin: 10
    },
    playAgainButton: {
        display: 'flex',
        justifyContent: 'center'
    }
};

class ResultsGuestPlayer extends Component {

    componentDidMount() {
        console.log(this.props)
        //if you are playing a contest game, send game data to saga
        this.props.history.location.search && this.sendContestGameData()
    }

    sendContestGameData = () => {
        this.props.dispatch({
            type: 'SEND_CONTEST_GAME_DATA',
            payload: {
                firstName: this.props.contestUserInfo.firstName,
                lastName: this.props.contestUserInfo.lastName,
                email: this.props.contestUserInfo.email,
                score: this.props.gameScore,
                time: this.props.gameTime,
                contestIdNumber: this.props.organizationInfo[0].id,
                organizationIdNumber: this.props.organizationInfo[0].organization_id
            }
        })
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
                <Grid
                    container
                    justify={"space-evenly"}
                    spacing={24}
                    alignItems={"center"}
                >
                    <div>
                        <Typography className={this.props.classes.scoreText} variant='h3'>
                            SCORE: {this.props.gameWrongAnswers.length === undefined ? 15 : 15 - this.props.gameWrongAnswers.length}/15 - {parseInt(((15 - this.props.gameWrongAnswers.length) / 15) * 100)}%
                    </Typography>
                    </div>
                    <div>
                        <Typography className={this.props.classes.scoreText} variant='h3'>
                            TIME: {this.props.gameTime}
                        </Typography>
                    </div>
                </Grid>
                <div>
                    {this.props.history.location.search && <Button
                        onClick={() => this.handleLeaderboardClick()}
                    >CONTEST LEADERBOARD</Button>}
                </div>
                <div>
                    <ResultsItemCard />
                </div>
                
                <div className={this.props.classes.playAgainButton}>
                    <Button onClick={this.playAgain} variant='contained' color='primary'>
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
        contestUserInfo: reduxStore.contestUserInfoReducer,
        organizationInfo: reduxStore.organizationTeamNameReducer,
        contestInfo: reduxStore.contestCompostBooleanReducer,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(ResultsGuestPlayer));
