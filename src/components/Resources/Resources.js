import React, { Component } from "react";
import { connect } from "react-redux";

//Material UI
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";


const styles = {
  link: {
    fontSize: 30,
    padding: "30px",
    color: "black",
    // "&:hover": {
    //   color: "white"
    // },
    backgroundColor: "green",
    opacity: 0.9,
    borderRadius: "10px",
  },
  p: {
    fontSize: 18,
    padding: "30px",
    color: "black"
  },
  a: {
    fontSize: 30,
    padding: "30px",
    color: "black"
  },
  mainDiv: {
    backgroundColor: "lightGrey",
    opacity: 0.8
  },
  Button: {
    backgroundColor: "green",
  }
};


class Resources extends Component {

  render() {
    return (
      <div className={this.props.classes.mainDiv}>
        <Grid container justify={"center"}>
          <p className={this.props.classes.a}> Want to learn more? </p>
        </Grid>
        <Grid container justify={"center"}>
          <p className={this.props.classes.p}>
            Checkout this link bellow for more information on the Minnesota
            Waste Wise website
          </p>
        </Grid>
        <Grid container justify={"center"}>
          <Button className={this.props.classes.Button} >
            <a
              href="http://www.mnwastewise.org"
              target="_blank"
              className={this.props.classes.link}
            >
              WasteWise MN
            </a>
          </Button>
        </Grid>
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
