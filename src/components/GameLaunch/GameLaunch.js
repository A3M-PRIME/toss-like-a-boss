import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const styles = {
    Button: {
        backgroundColor: "green",
        color: "white",
        border: "2px solid black",
        fontSize: "calc(10px + 2vmin)",
    },
    div: {
        backgroundColor: "blue",
        border: "5px solid black",
    },
    item: {

    }
    
};

class GameLaunch extends Component {
    render() {
        return (
          <div className={this.props.classes.div}>
            <Grid
              container
              justify={"space-evenly"}
              spacing={12}
              alignItems={"center"}
            >
              <h1>WASTE-WISE-R</h1> <h3>items remaining : 15</h3>{" "}
              <h3>Elapsed Time showing : 0:00</h3>
            </Grid>
            <body>
              <Grid
                container
                justify={"space-evenly"}
                spacing={6}
                alignItems={"center"}
              >
                <Button className={this.props.classes.Button} onClick>
                  {" "}
                  How To Play{" "}
                </Button>
                <h2>Score : 0</h2>
                <Button className={this.props.classes.Button} onClick>
                  {" "}
                  Back To Home{" "}
                </Button>
              </Grid>
              <br></br>
              <Grid
                container
                justify={"space-evenly"}
                spacing={48}
                alignItems={"center"}
              >
                <Button className={this.props.classes.Button} onClick>
                  {" "}
                  READY?!{" "}
                </Button>
              </Grid>
            </body>
            <footer>
              {" "}
              <Grid
                container
                justify={"space-evenly"}
                spacing={48}
                alignItems={"center"}
              >
                <div className={this.props.classes.item}> Trash/Garbage </div>
                <div className={this.props.classes.item}> Recycle </div>
                <div className={this.props.classes.item}> Compost </div>
              </Grid>
            </footer>
          </div>
        );
    }
}

//mapping the state to props
const mapStateToProps = reduxStore => {
    return {
        reduxStore
    }
}

// exports the component
export default connect(mapStateToProps)(withStyles(styles)(GameLaunch));