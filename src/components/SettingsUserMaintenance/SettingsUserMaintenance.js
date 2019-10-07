import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'


class SettingsUserMaintenance extends Component {
    render () {
        return(
            <div></div>
        );
    };
}

const mapStateToProps = reduxStore => {
    return {
        reduxStore
    };
};



export default connect(mapStateToProps)(SettingsUserMaintenance);