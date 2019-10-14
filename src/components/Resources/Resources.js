import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const styles = {
  background: {
    backgroundColor: "green",
    "&:hover": {
      // change to both KEY and the
      // textDecoration: "underline",
      backgroundColor: "yellow",
      color: "black",
  }
}
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
          <a href="url">http://www.mnwastewise.org</a>
        </Grid>
        <body className={this.props.classes.background}>
          <div style={{ padding: 20 }}>
            <Grid
              container
              spacing={5}
              justify={"space-evenly"}
              spacing={24}
              alignItems={"center"}
            >
              <a href="url">http://www.mnwastewise.org</a>
            </Grid>
          </div>
        </body>
      </div>
    );
  }
}

export default (withStyles(styles)(Resources));
