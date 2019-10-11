import React, { Component } from 'react';


class HowToPlay extends Component {

    toGame = () => {
    this.props.history.push('/game'); 
  };

    render () {
        return (
          <div onClick={this.toGame}>
            <img
              src="HowToPlay.jpg"
              alt="How To Play"
              height="400"
              width="600"
            ></img>
          </div>
        );
    };
}




export default HowToPlay;