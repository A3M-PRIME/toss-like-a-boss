import React, { Component } from "react";

//Material UI components
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";


class LeaderboardList extends Component {
    render() {
        return (
          <TableRow>
            <TableCell>
              {this.props.player.first_name} {this.props.player.last_name}
            </TableCell>
            <TableCell>{this.props.player.score}</TableCell>
            <TableCell>{this.props.player.time}</TableCell>
            <TableCell>{this.props.player.team_name}</TableCell>
          </TableRow>
        );
    }
}

export default LeaderboardList;