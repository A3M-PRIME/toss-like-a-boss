import React, { Component } from "react";
import { connect } from "react-redux";

//Material UI
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const styles = {
  link: {
    fontSize: 50,
    padding: "30px",
    color: "black",
    "&:hover": {
      color: "white"
    }
  },
  div: {
    backgroundColor: "lightgreen",
    padding: "10px"
  },
  p: {
    fontSize: 50,
    padding: "30px",
    color: "black"
  }
};


class Resources extends Component {

  render() {
    return (
      <div className={this.props.classes.div}>
        <body className={this.props.classes.div}>
          <Grid
            className={this.props.classes.p}
            container
            justify={"center"}
            
          >
            <p> Want to learn more? </p>
          </Grid>
          <Grid
            className={this.props.classes.p}
            container
            justify={"center"}
          
          >
            <p>Checkout this link bellow for more information on the Minnesota Waste Wise website</p>
          </Grid>
          <Grid
            className={this.props.classes.link}
            container
            justify={"center"}
            
          >
            <a
              href="http://www.mnwastewise.org"
              target="_blank"
              className={this.props.classes.link}
            >
              WasteWise MN
            </a>
          </Grid>
        </body>
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    reduxStore
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Resources));
