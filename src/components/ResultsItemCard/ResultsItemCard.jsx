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
        if (this.props.wrongAnswers[0]) {
            //TO DO:
            //REPLACE PLACEHOLDERS WITH
            //ARRAY VARIABLES
            wrongAnswerArray = this.props.wrongAnswerReducer.map(item => {
                return (
                    <div>
                        <div>
                            <Typography variant="h6">
                                These items were sorted incorrectly:
                            </Typography>
                        </div>
                        <Card>
                            <CardHeader
                                title="Soda can"
                            />
                            <CardContent>
                                <CardMedia
                                    className={this.props.classes.media}
                                    image="drpepper.jpg"
                                />
                                <Typography component="p">
                                    Aluminum should always be recycled after being rinsed
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
                {wrongAnswerArray && wrongAnswerArray}
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