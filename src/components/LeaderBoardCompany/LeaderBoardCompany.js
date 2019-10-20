import React, { Component } from "react";
import { connect } from "react-redux";
import LeaderboardList from "../LeaderboardList/LeaderboardList";

//Material UI Components
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

//Material UI styles
const styles = theme => ({
  grid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: '50%',
    backgroundColor: "green",
    color: "white"
  }
});

class Leaderboard extends Component {
  componentDidMount() {
    this.getLeaderboardInfo();
    console.log(this.props)
  };

  getLeaderboardInfo() {
    let contestIdNumber = this.props.history.location.search.split("=").pop();
    console.log('id numbre is ', contestIdNumber)
    this.props.dispatch({
      type: "FETCH_LEADERBOARD",
      payload: this.props.store.companyIdNumberReducer
      // payload: contestIdNumber
    });
    console.log('ID NUMBER REDUCER', this.props.store.companyIdNumberReducer)
  }

  playAgain = () => {
    if (this.props.history.location.search) {
      this.props.history.push(`/gamelaunch${this.props.history.location.search}`)
    } else {
      this.props.history.push("/gamelaunch");
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid container spacing={24}>
          <Grid item xs></Grid>
          <Grid item xs={6}>
            <div className={classes.grid}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={this.playAgain}
              >
                PLAY AGAIN
              </Button>
              <br />
              <br />
            </div>
            <Paper>
            <div className={classes.grid}>
              <h1>Contest Leaderboard</h1>
            </div>
            
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Department</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.store.leaderboardReducer.map(player => {
                    return <LeaderboardList player={player} />;
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}></Paper>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default withStyles(styles)(connect(mapStateToProps)(Leaderboard));
