import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Backdrop, Card, CardActions, CardContent, Grid, MenuItem, Modal, TextField } from "@material-ui/core";
import { AddCircle, Edit, Cancel, Save, Delete, Link, InfoIcon, Close } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

const MySwal = withReactContent(Swal)

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    close: {
        padding: theme.spacing.unit / 2
    },
    card: {
        textAlign: 'center',
        background: '#fff',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardHeader: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    cardContent: {
        fontSize: 14
    },
    cardContentLeft: {
        fontSize: 20,
        width: 10
    },
    cardContentIcons: {
        fontSize: 20,
        paddingLeft: 5,
        paddingRight: 5
    },
    cardContentContest: {
        fontSize: 20,
        paddingLeft: 8,
        textAlign: 'align'
    },
    icon: {
        width: 35,
        height: 35,
        marginLeft: 10,
        marginBottom: -8,
    },
    fieldMedium: {
        margin: 5,
        width: 240,
        '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
            borderColor: "black"
        }
    },
    fieldLarge: {
        margin: 5,
        width: 490,
        '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
            borderColor: "black"
        }
    },
    edit: {
        width: "10%"
    },
    delete: {
        width: "10%"
    },
    contestName: {
        width: "55%"
    },
    contestLink: {
        width: "25%"
    },
    td: {
        textAlign: "center"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        backgroundColor: '#fff',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        color: theme.palette.secondary.main,
        textAlign: 'center'
    },
    input: {
        color: "black"
    },
    cssLabel: {
        '&$cssFocused': {
            color: "black",
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: "black",
        },
    },
    cssFocused: {},
    notchedOutline: { borderColor: "black" }
});

class Contests extends Component {

    state = {
        contestName: '',
        contestStartDate: '',
        contestStartTime: 0,
        contestEndDate: '',
        contestEndTime: 0,
        contestNameId: 0,
        contestEditOpen: false,
        snackBarShowOpen: false,
    }

    componentDidMount() {
        this.getContests();
    }
    
    getContests() {
        this.props.dispatch({
            type: 'FETCH_CONTESTS'
        })
    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value
        });
    }

    handleContestEditOpen = (name, startDate, startTime, endDate, endTime, id) => {
        this.setState({
            contestEditOpen: !this.state.contestEditOpen,
            contestName: name,
            contestStartDate: startDate,
            contestStartTime: startTime,
            contestEndDate: endDate,
            contestEndTime: endTime,
            contestNameId: id
        })
    };

    handleContestClose = () => {
        this.setState({
            contestEditOpen: false,
            // teamAddOpen: false,
            // teamName: ''
        })
    };

    handleEdit = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'UPDATE_CONTEST',
            payload: this.state

        })
        this.handleContestClose();
    }

    handleDelete = (name, id) => {
        MySwal.fire({
            title: `Delete the ${name} contest?`,
            text: `${name} will be removed from the system.`,
            type: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({
                    type: 'DELETE_CONTEST',
                    payload: id
                })
                Swal.fire(
                    'Deleted!',
                    `The ${name} contest has been deleted.`,
                    'success'
                )
            }
        })
    }

    copyLink = (code) => {
        this.setState({ snackBarShowOpen: true });
        let dummy = document.createElement("textarea");
        let currentUrl = window.location.href
        let newUrl = '';
        for (let each of currentUrl) {
            if (each !== '#') {
                newUrl += each
            } else if (each == '#') {
                break;
            }
        }
        newUrl += '#/game?contest='
        newUrl += code
        document.body.appendChild(dummy);
        dummy.value = newUrl;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    handleSnackShowClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        this.setState({ snackBarShowOpen: false });
    };

    render() {

        const { classes } = this.props

        let contestList = this.props.contest.map(contest => {
            return (
                <tr>
                    <td className={classes.cardContentIconsLeft}>
                        <Button onClick={() => this.handleContestEditOpen(contest.contest_name, contest.start_date, contest.start_time, contest.end_date, contest.end_time, contest.id)}>
                            <Edit/>
                        </Button>
                    </td>
                    <td className={classes.cardContentIcons}>
                        <Button onClick={() => this.handleDelete(contest.contest_name, contest.id)}>
                            <Delete/>
                        </Button>
                    </td>
                    <td className={classes.cardContentContest}>
                        {contest.contest_name}
                    </td>
                    <td>
                        <Button onClick={() => this.copyLink(contest.access_code)}>
                            <Link style={{marginRight: 3}}/>Copy Link
                        </Button>
                    </td>
                </tr>
            )
        })

        let hourSelection = []

        for (let i = 0; i < 24; i++) {
            let hourFormat = {
                displayValue: 0,
                sqlValue: 0
            }
            hourFormat.sqlValue = i;
            if (i == 0) {
                hourFormat.displayValue = '12 am'
                hourSelection.push(hourFormat);
            } else if (i < 12) {
                hourFormat.displayValue = i + ' am'
                hourSelection.push(hourFormat);
            } else if (i == 12) {
                hourFormat.displayValue = '12 pm'
                hourSelection.push(hourFormat)
            } else if (i <= 23) {
                let j = i;
                hourFormat.displayValue = j - 12 + ' pm'
                hourSelection.push(hourFormat);
            }
        }

        return (
            <div>
                <Grid container spacing={4} justify="center">
                    <Grid item sm={3}>
                    </Grid>
                    <Grid item sm={6}>
                        <Card className={classes.card}>
                            <CardActions style={{ backgroundColor: "#EEF1F1" }}>
                                <Grid item sm={5}>
                                </Grid>
                                <Grid item sm={2}>
                                    <span className={classes.cardHeader} style={{ marginLeft: "auto" }}>Contests</span>
                                </Grid>
                                <Grid item sm={5} style={{ textAlign: "right" }}>
                                    <Button onClick={() => this.handleContestAddOpen()} style={{ marginLeft: "auto", }}>
                                        <AddCircle style={{ marginRight: 3 }} />Add New Contest
                                    </Button>
                                </Grid>
                            </CardActions>
                            <CardContent style={{ backgroundColor: "#EEF1F1" }}>
                                {!this.props.contest[0] && <br />}
                                {!this.props.contest[0] && <br />}
                                {!this.props.contest[0] &&
                                    <span className={classes.cardContent}>You have not added any contests.  Get started by clicking the <b>Add New Contest</b> button!</span>
                                }
                                {this.props.contest[0] && <table className={classes.tableContest}>
                                    <thead>
                                        <tr>
                                            <th className={classes.edit}>Edit</th>
                                            <th className={classes.delete}>Delete</th>
                                            <th className={classes.contestName}>Contest Name</th>
                                            <th className={classes.contestLink}>Contest Link</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contestList}
                                    </tbody>
                                </table>}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={3}>
                    </Grid>
                </Grid>

                <Modal
                    aria-labelledby="edit contest"
                    aria-describedby="edit contest"
                    className={classes.modal}
                    open={this.state.contestEditOpen}
                    onClose={this.handleContestClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <CardContent className={classes.form} style={{ backgroundColor: "#EEF1F1" }}>

                        {/* <h1 className={classes.h1} style={{ color: this.props.user.color }}>Enter Contest Details</h1> */}
                        <form onSubmit={this.handleEdit}>
                            <div>
                                <TextField
                                    align="left"
                                    id="outlined-name"
                                    label="contest name"
                                    className={classes.fieldLarge}
                                    value={this.state.contestName}
                                    onChange={this.handleChangeFor('contestName')}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        }
                                    }}
                                    InputLabelProps={{
                                        className: classes.input,
                                        shrink: true
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    type="date"
                                    align="left"
                                    id="outlined-name"
                                    label="contest start date"
                                    className={classes.fieldMedium}
                                    value={this.state.contestStartDate}
                                    onChange={this.handleChangeFor('contestStartDate')}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        }
                                    }}
                                    InputLabelProps={{
                                        className: classes.input,
                                        shrink: true
                                    }}
                                />
                                <TextField
                                    align="left"
                                    id="outlined-name"
                                    select
                                    label="contest start time"
                                    className={classes.fieldMedium}
                                    value={this.state.contestStartTime}
                                    onChange={this.handleChangeFor('contestStartTime')}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.status,
                                        },
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        }
                                    }}
                                    InputLabelProps={{
                                        className: classes.input,
                                        shrink: true
                                    }}
                                >
                                    {hourSelection.map((hour) =>
                                        <MenuItem key={hour.sqlValue} value={hour.sqlValue} className={classes.timeOptions}>
                                            {hour.displayValue}
                                        </MenuItem>
                                    )}
                                </TextField>
                            </div>
                            <div>
                                <TextField
                                    type="date"
                                    align="left"
                                    id="outlined-name"
                                    label="contest end date"
                                    className={classes.fieldMedium}
                                    value={this.state.contestEndDate}
                                    onChange={this.handleChangeFor('contestEndDate')}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        }
                                    }}
                                    InputLabelProps={{
                                        className: classes.input,
                                        shrink: true
                                    }}
                                />
                                <TextField
                                    align="left"
                                    id="outlined-name"
                                    select
                                    label="contest end time"
                                    className={classes.fieldMedium}
                                    value={this.state.contestEndTime}
                                    onChange={this.handleChangeFor('contestEndTime')}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.status,
                                        },
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        }
                                    }}
                                    InputLabelProps={{
                                        className: classes.input,
                                        shrink: true
                                    }}
                                >
                                    {hourSelection.map((hour) =>
                                        <MenuItem key={hour.sqlValue} value={hour.sqlValue} className={classes.timeOptions}>
                                            {hour.displayValue}
                                        </MenuItem>
                                    )}
                                </TextField>
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    name="cancel"
                                    color="secondary"
                                    onClick={() => this.handleContestClose()}
                                    style={{ marginTop: 10, marginRight: 10 }}>
                                    <Cancel style={{ marginRight: 3 }} />Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    name="submit"
                                    color="primary"
                                    style={{ marginTop: 10 }}>
                                    <Save style={{ marginRight: 3 }} />Save
                         </Button>
                            </div>
                        </form>

                    </CardContent>
                </Modal>

                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                    }}
                    open={this.state.snackBarShowOpen}
                    autoHideDuration={6000}
                    onClose={this.handleSnackShowClose}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={<span id='message-id'>Copied link to clipboard!</span>}
                    action={[
                        <IconButton
                            key='close'
                            aria-label='Close'
                            color='inherit'
                            className={classes.close}
                            onClick={this.handleSnackShowClose}>
                            <Close />
                        </IconButton>
                    ]}
                />

            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        user: reduxStore.user,
        team: reduxStore.teamSettings,
        organization: reduxStore.orgSettings,
        contest: reduxStore.contestSettings
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Contests));