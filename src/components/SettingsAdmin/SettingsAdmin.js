import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { AccountBalance, Fastfood, NaturePeople, Settings } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Items from './Components/Items';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    card: {
        textAlign: 'center',
        background: '#fff',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardHeader: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    cardContent: {
        fontSize: 24
    },
    h1: {
        textAlign: 'right'
    },
    icon: {
        width: 35,
        height: 35,
        marginLeft: 10,
        marginBottom: -8,
    },
    buttonRow: {
        textAlign: 'center'
    },
    button: {
        margin: 8
    }
});

class SettingsAdmin extends Component {

    state = {
        items: 'true'
    }

    handleDisplay = () => {
        this.setState({
          items: !this.state.items  
        })
    }

    render() {

        const { classes } = this.props

        return (
            <div className={classes.root}>
                <h1 className={classes.h1}>Waste Wise Settings<Settings className={classes.icon} /></h1>
                <div className={classes.buttonRow}>
                    {this.state.items && <Button className={classes.button} variant="contained" name="items" color="primary">Items</Button>}
                    {!this.state.items && <Button className={classes.button} variant="contained" name="items" color="secondary" onClick={() => this.handleDisplay()}>Items</Button>}
                    {this.state.items && <Button className={classes.button} variant="contained" name="users" color="secondary" onClick={() => this.handleDisplay()}>Users</Button>}
                    {!this.state.items && <Button className={classes.button} variant="contained" name="users" color="primary">Users</Button>}
                </div>
                {this.state.items && <h2>Items<Fastfood className={classes.icon} /></h2>}
                {!this.state.items && <h2>Users<NaturePeople className={classes.icon} /></h2>}
            </div>
        );
    }
}

//exports the component
const mapStateToProps = (reduxStore) => {
    return {
        user: reduxStore.user,
        // team: reduxStore.teamSettings,
        // organization: reduxStore.orgSettings,
        // contest: reduxStore.contestSettings
    }
}
export default connect(mapStateToProps)(withStyles(styles)(SettingsAdmin));