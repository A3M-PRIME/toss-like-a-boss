import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import ResultsItemCard from '../ResultsItemCard/ResultsItemCard';

const styles = {
    media:{
        width: '100px',
        height: '100px'
    }
}

class ResultsGuestPlayer extends Component {
    render() {
        return (
            <div>
                <div>
                    <Typography component="h1">
                        GAME RESULTS
                    </Typography>
                </div>
                <div>
                    <Typography component="h1">
                        SCORE: 12/15 80%
                    </Typography>
                </div>
                <div>
                    <Typography component="body1">
                        These items were sorted incorrectly:
                    </Typography>
                    <ResultsItemCard />
                </div>
                <div>
                    <Button variant="contained">CLICK HERE TO PLAY AGAIN</Button>
                </div>
                <div>
                    <Button variant="contained">CHECK OUT THE LEADERBOARD</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ResultsGuestPlayer));