import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        opacity: .9
    },
    modalHeader: {
        border: '1px solid black',
        backgroundColor: 'green',
        width: 500,
        height: 300,
        textAlign: 'center',
        opacity: 1,
        borderRadius: 50,
        fontWeight: 800,
        margin: 'auto',
        justifyContent: 'center',
        display: 'flex'
    }
}

class StartGameModal extends Component {

    state = {
        open: true,
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div
                onClick={this.props.handleTimerStart}
                className={this.props.classes.modal}>
                <Modal

                    className={this.props.classes.modal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div>
                        <Typography className={this.props.classes.modalHeader} variant="h1" id="modal-title">
                            START GAME
            </Typography>
                        {/* <Typography variant="subtitle1" id="simple-modal-description">
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
                        {/* <SimpleModalWrapped /> */}
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(StartGameModal);