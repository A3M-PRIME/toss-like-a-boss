import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid } from "@material-ui/core";
import { AccountBalance, People, Settings } from '@material-ui/icons';
import OrganizationName from './SettingsComponents/OrganizationName';
import Teams from './SettingsComponents/Teams';

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
});

class SettingsOrganization extends Component {

  state = {

  }

  render() {

    const { classes } = this.props

    return (

      <div className={classes.root}>
        <h1 className={classes.h1}>Settings<Settings className={classes.icon} /></h1>
        <h2>Organization<AccountBalance className={classes.icon} /></h2>
          <OrganizationName/>
        <h2>Teams<People className={classes.icon} /></h2>
          <Teams/>
      </div>

    )

  }

}

const mapStateToProps = (reduxStore) => {
  return {
    user: reduxStore.user,
  }
}
export default connect(mapStateToProps)(withStyles(styles)(SettingsOrganization));