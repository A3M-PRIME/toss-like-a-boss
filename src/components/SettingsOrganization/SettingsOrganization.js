import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Card, Grid } from "@material-ui/core";
import { Settings } from '@material-ui/icons';

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

class SettingsOrganization extends Component {

  state = {

  }

  render() {

    const { classes } = this.props

    return (

      <div className={classes.root}>
        <h1 className={classes.h1}>Settings<Settings className={classes.icon} /></h1>
          <h2>Organization</h2>
          <Grid container spacing={4} justify="center">
          <Grid item sm={3}>
          </Grid>
          <Grid item sm={6}>
            <Card className={classes.card}>
              Organization Information
          </Card>
          </Grid>
          <Grid item sm={3}>
          </Grid>
        </Grid>
      </div>

    )

  }

}

const mapStateToProps = (reduxStore) => {
  return {
    user: reduxStore.user,
    organization: reduxStore.organization,
  }
}
export default connect(mapStateToProps)(withStyles(styles)(SettingsOrganization));