import React, { Component } from 'react';
import PerfectScore from '../PerfectScore/PerfectScore';
import { connect } from 'react-redux';

//materialUI imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = {
    media: {
        width: '100px',
        height: '100px'
    }
}

class ResultsItemCard extends Component {
    render() {
        let wrongAnswerArray = [];
        //if there were incorrect answers, map over the array they are 
        //stored in from redux and create cards to display information
        //to user
        //if there are no incorrect answers, render the PerfectScore component
        if (this.props.wrongAnswers && this.props.wrongAnswers[0]) {
            wrongAnswerArray = this.props.wrongAnswers.map(item => {
                return (
                    <div>
                        <Card>
                            <CardHeader
                                title={item.name}
                            />
                            <CardContent>
                                <CardMedia
                                    className={this.props.classes.media}
                                    image={item.url}
                                />
                                <Typography component="p">
                                    {item.item_text}
                            </Typography>
                            </CardContent>
                        </Card>
                    </div>
                )
            })
        } else {
            return <PerfectScore />
        }
        return (
            <div>
            <div>
                <Typography variant="h6">
                    These items were sorted incorrectly:
                            </Typography>
            </div>
            <div>
                {wrongAnswerArray && wrongAnswerArray}
            </div>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        wrongAnswers: reduxStore.gameWrongAnswerReducer
    }
}
export default connect(mapStateToProps)(withStyles(styles)(ResultsItemCard));