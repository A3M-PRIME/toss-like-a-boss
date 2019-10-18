import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';


const styles = {
    compostDiv: {
        backgroundColor: "grey",
        borderRadius: "25px"
    }
}

class CompostBinChoice extends Component {
    noCompostClick = () => {
        this.props.dispatch({
            type: 'NO_COMPOST_BIN'
        })
        this.props.history.push('/game')
    }
    render() {
        return (
          <div className={this.props.classes.compostDiv}>
            <Typography variant='h6'>
              Do you have a compost bin? Please select yes or no:
            </Typography>
            <Button
              color='secondary'
              variant='outlined'
              onClick={() => this.props.history.push("/game")}>
              Yes
            </Button>
            <Button
              color='secondary'
              variant='outlined'
              onClick={this.noCompostClick}>
              No
            </Button>
          </div>
        );
    }
}

export default connect()(withRouter(withStyles(styles)(CompostBinChoice)));