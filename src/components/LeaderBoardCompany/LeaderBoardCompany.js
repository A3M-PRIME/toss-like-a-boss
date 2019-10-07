<<<<<<< HEAD
import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

class LeaderBoardCompany extends Component {
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
export default connect(mapStateToProps)(LeaderBoardCompany);
=======
import React, {Component} from "react";

class Leaderboard extends Component {
    render() {
        return (
            "Leadeboard"
        )
    }
}

export default Leaderboard;
>>>>>>> 3083ce97286c370dd7926f20d4407110a457f51e
