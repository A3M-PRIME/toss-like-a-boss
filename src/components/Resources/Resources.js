import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const styles = {
  

};


class Resources extends Component {

  render() {
    return (
      <div>
        <Grid
          container
          justify={"space-evenly"}
          spacing={24}
          alignItems={"center"}
        >
          <a href="http://www.mnwastewise.org" target="_blank">
            WasteWise MN
          </a>
        </Grid>
      </div>
    );
  }
}

export default (withStyles(styles)(Resources));
