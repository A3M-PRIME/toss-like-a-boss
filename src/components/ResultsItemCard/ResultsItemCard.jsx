import React, { Component } from 'react';

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
        return (
            <div>
                {/* Card to display incorrect item */}
                {/* map over reducer here */}
                <div>
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
            </div>
        );
    }
}

export default withStyles(styles)(ResultsItemCard);