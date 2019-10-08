import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    textAlign: 'center',
    background: '#494A49',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class SettingsOrganization extends Component {

  render() {

    return (

      <div>
        This is the Organization Settings page!
      </div>

    )

  }

}

const mapStateToProps = (reduxStore) => {
  return {

  }
}
export default connect(mapStateToProps)(withStyles(styles)(SettingsOrganization));