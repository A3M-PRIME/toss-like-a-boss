import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

class Game extends Component {
  render() {
    return (
    <div>
      <header>
"Title of Game & items remaining & Elapsed Time showing"
</header>

<body>
<Button onClick > How To Play </Button>

<h2>Score : 0</h2>
<Button onClick> Back To Home </Button>
<Button onClick > READY?! </Button>

</body>
<footer>
- Receptacles - Trash/Garbage - Recycle - Compost
</footer>

  

</div>
    )
  }
}


//exports the component
export default (Game);
