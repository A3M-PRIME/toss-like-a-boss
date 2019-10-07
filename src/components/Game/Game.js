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
- How To Play Button - Navigates to How To Play Picture <Button onClick > How To Play </Button>
{/* - How to Play Picture - return back to game page <onClick> */}
<h2>Score : 0</h2>
- Back to Home Button - Navigates to Game Home / Play Page <Button onClick> Back To Home </Button>
- Ready?! Button - Start the Game<Button onClick > READY?! </Button>

</body>
<footer>
- Receptacles - Trash/Garbage - Recycle - Compost
</footer>

  

</div>
    )
  }
}


//exports the component
export default connect(mapStateToProps)(Game);
