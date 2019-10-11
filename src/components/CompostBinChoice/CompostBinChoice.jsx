import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

class CompostBinChoice extends Component {
    noCompostClick = () => {
        this.props.dispatch({
            type: 'NO_COMPOST_BIN'
        })
        this.props.history.push('/game')
    }
    render() {
        return (
            <div>
                <Typography variant="h6">
                    Do you have a compost bin? Please select yes or no:
                </Typography>
                <Button onClick={() => this.props.history.push('/game')}>
                    Yes
                </Button>
                <Button onClick={this.noCompostClick}>
                    No
                </Button>
            </div>
        );
    }
}

export default connect()(withRouter(CompostBinChoice));