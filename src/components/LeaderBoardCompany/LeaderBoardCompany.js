import React, { Component } from "react";

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
  }
});

class Leaderboard extends Component {
  render() {
          const { classes } = this.props;
    return (
      <>
        <Grid container spacing={24}>
          <Grid item xs>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item xs={6}>
            <Button>PLAY AGAIN</Button>
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

export default withStyles(styles)(Leaderboard);
