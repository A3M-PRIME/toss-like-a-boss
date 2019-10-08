import React, { Component } from "react";
import { connect } from "react-redux";

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
  close: {
    padding: theme.spacing.unit / 2
  },
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

  componentDidMount = () => {
    this.getLeaderboardInfo();
  }

  getLeaderboardInfo()  {
    this.props.dispatch({
      type: "FETCH_LEADERBOARD",
    });
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
                variant='outlined'
                color='primary'
                className={classes.button}>
                PLAY AGAIN
              </Button>
            </div>
            <div className={classes.grid}>
              <h1>"Company Name" Leaderboard</h1>
            </div>
            <Paper>
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
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
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
