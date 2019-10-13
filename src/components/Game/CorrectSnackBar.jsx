import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";

class CorrectSnackBar extends Component {
  handleClose =() => {

    this.props.dispatch({
      type: "CLOSE_SNACK_BAR"
    });
  };


  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.props.store.correctSnackBarReducer}
          autoHideDuration={700}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id='message-id'>YOU WERE CORRECT</span>}
          action={[
            <IconButton
              key='close'
              aria-label='close'
              color='inherit'
              onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default connect(mapStateToProps)(CorrectSnackBar);
