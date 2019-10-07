import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

class ResultsGuestPlayer extends Component {
  render() {
    return <div></div>;
  }
}

// mapping the state to props
const mapStateToProps = reduxStore => {
  return {
    reduxStore
  };
};

//exports the component
export default connect(mapStateToProps)(ResultsGuestPlayer);
