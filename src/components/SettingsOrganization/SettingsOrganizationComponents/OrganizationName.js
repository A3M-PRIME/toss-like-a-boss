import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Card, CardContent, Grid } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

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
        fontSize: 20,
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
});

class OrganizationName extends Component {

    state = {

    }

    componentDidMount() {
        this.getOrganization();
    }

    getOrganization() {
        this.props.dispatch({
            type: 'FETCH_ORGANIZATION'
        })
    }

    render() {

        const { classes } = this.props

        return (

            <Grid container spacing={4} justify="center">
                <Grid item sm={3}>
                </Grid>
                <Grid item sm={6}>
                    <Card className={classes.card}>
                        <CardContent>
                            <span className={classes.cardHeader}>Organization Name</span>
                            <br /><br />
                            <span className={classes.cardContent}>{this.props.organization.organization_name}</span>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={3}>
                </Grid>
            </Grid>
        )

    }

}

const mapStateToProps = (reduxStore) => {
    return {
        user: reduxStore.user,
        organization: reduxStore.orgSettings,
    }
}
export default connect(mapStateToProps)(withStyles(styles)(OrganizationName));