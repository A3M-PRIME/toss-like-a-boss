import React, { Component } from "react";
import first from "../../img/firstHowToSlide.png";
import second from "../../img/secondHowToSlide.png";
import third from "../../img/thirdHowToSlide.png";
import fourth from "../../img/fourthHowToSlide.png";
import fifth from "../../img/fifthHowToSlide.png";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const styles = {
  howToDiv: {
    backgroundColor: "rgb(245,245,245,.5)",
    borderRadius: "25px",
    textAlign: "center"
  },
  header: {
    textAlign: "center"
  },
  button: {
    width: "80%",
    fontSize: "2em",
    backgroundColor: "green",
    marginBottom: "5px"
  }
};

class HowToPlay extends Component {
  state = {
    pageNumber: 1
  };

  componentDidUpdate(prevProps) {
    if (this.state.pageNumber !== prevProps.pageNumber) {
      console.log("props changed");
    }
  }

  toGame = () => {
    this.props.history.push("/game");
  };
  toHomeScreen = () => {
    this.props.history.push("/gamelaunch");
  };

  nextPage = () => {
    this.setState({
      pageNumber: this.state.pageNumber + 1
    });
  };

  render() {
    return (
      <div>
        {this.state.pageNumber === 1 && (
          <div className={this.props.classes.howToDiv}>
            <h1 className={this.props.classes.header}>
              The game will start with a piece of trash on screen that needs to
              be sorted
            </h1>
            <Button
              className={this.props.classes.button}
              variant='outlined'
              onClick={this.nextPage}>
              Next
            </Button>
            <img src={first} alt='How To Play' height='80%' width='80%' />
            <br />
          </div>
        )}

        {this.state.pageNumber === 2 && (
          <div className={this.props.classes.howToDiv}>
            <h1 className={this.props.classes.header}>
              The player must select the correct bin to place the trash into
            </h1>
            <Button
              className={this.props.classes.button}
              variant='outlined'
              onClick={this.nextPage}>
              Next
            </Button>
            <img src={second} alt='How To Play' height='80%' width='80%' />
          </div>
        )}
        {this.state.pageNumber == 3 && (
          <div className={this.props.classes.howToDiv}>
            <h1 className={this.props.classes.header}>
              The player must select the correct bin to place the trash into
            </h1>
            <Button
              className={this.props.classes.button}
              variant='outlined'
              onClick={this.nextPage}>
              Next
            </Button>
            <img src={second} alt='How To Play' height='80%' width='80%' />
          </div>
        )}
        {this.state.pageNumber === 4 && (
          <div className={this.props.classes.howToDiv}>
            <h1 className={this.props.classes.header}>
              If the player is correct a new item will appear on screen. There
              will be fifteen items total
            </h1>
            <Button
              className={this.props.classes.button}
              variant='outlined'
              onClick={this.nextPage}>
              Next
            </Button>
            <img src={third} alt='How To Play' height='80%' width='80%' />
          </div>
        )}
        {this.state.pageNumber === 5 && (
          <div className={this.props.classes.howToDiv}>
            <h1 className={this.props.classes.header}>
              If the player places an item in the wrong bin, they must place it
              in the correct bin to move on.
            </h1>
            <Button
              className={this.props.classes.button}
              variant='outlined'
              onClick={this.nextPage}>
              Next
            </Button>
            <img src={fourth} alt='How To Play' height='80%' width='80%' />
          </div>
        )}
        {this.state.pageNumber === 6 && (
          <div className={this.props.classes.howToDiv}>
            <h1 className={this.props.classes.header}>
              Points are only awarded if the player gets it right on the first
              try.
            </h1>
            <Button
              className={this.props.classes.button}
              variant='outlined'
              onClick={this.toHomeScreen}>
              Back to Home Screen
            </Button>
            <Button
              className={this.props.classes.button}
              variant='outlined'
              onClick={this.toGame}>
              Play the Game!
            </Button>
            <img src={fifth} alt='How To Play' height='80%' width='80%' />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(HowToPlay);
