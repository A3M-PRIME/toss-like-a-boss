import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Backdrop, Card, CardActions, CardContent, Grid, Modal, TextField } from "@material-ui/core";
import { AddCircle, Edit, Cancel, Save, Delete } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)

const styles = theme => ({
    root: {
        flexGrow: 1,
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
    cardContentTeams: {
        fontSize: 20,
        paddingLeft: 8,
        textAlign: 'left'
    },
    icon: {
        width: 35,
        height: 35,
        marginLeft: 10,
        marginBottom: -8,
    },
    fieldLarge: {
        margin: 5,
        width: 490,
        '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
            borderColor: "black"
        }
    },
    tableTeam: {
        // marginLeft: 'auto',
        // marginRight: 'auto'
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

class Teams extends Component {

    state = {
        teamNameEdit: false,
        teamName: '',
        teamNameId: 0,
        teamEditOpen: false,
        teamAddOpen: false,
    }

    componentDidMount() {
        this.getTeams();
        this.getOrganization();
    }

    getTeams() {
        this.props.dispatch({
            type: 'FETCH_TEAMS'
        })
    }

    getOrganization() {
        this.props.dispatch({
            type: 'FETCH_ORGANIZATION'
        })
    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value
        });
    }

    handleTeamEditOpen = (name, id) => {
        this.setState({
            teamEditOpen: !this.state.teamEditOpen,
            teamName: name,
            teamNameId: id
        })
    };

    handleTeamAddOpen = () => {
        this.setState({
            teamAddOpen: !this.state.teamAddOpen,
        })
    };

    handleTeamClose = () => {
        this.setState({
            teamEditOpen: false,
            teamAddOpen: false,
            teamName: ''
        })
    };

    handleEdit = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'UPDATE_TEAM',
            payload: this.state

        })
        this.handleTeamClose();
    }

    handleDelete = (name, id) => {
        MySwal.fire({
            title: `Delete the ${name} team?`,
            text: `${name} will be removed from the system.`,
            type: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({
                    type: 'DELETE_TEAM',
                    payload: id
                })
                Swal.fire(
                    'Deleted!',
                    `The ${name} team has been deleted.`,
                    'success'
                )
            }
        })
    }

    handleTeamAdd = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_TEAM',
            payload: this.state

        })
        this.handleTeamClose();
    }

    render() {

        const { classes } = this.props

        let teamList = this.props.team.map(team => {
            return (
                <tr>
                    <td className={classes.cardContentIconsLeft}>
                        <Button onClick={() => this.handleTeamEditOpen(team.team_name, team.id)}>
                            <Edit />
                        </Button>
                    </td>
                    <td className={classes.cardContentIcons}>
                        <Button onClick={() => this.handleDelete(team.team_name, team.id)}>
                            <Delete />
                        </Button>
                    </td>
                    <td className={classes.cardContentTeams}>
                        {team.team_name}
                    </td>
                </tr>
            )
        })

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
                                    <span className={classes.cardHeader} style={{ marginLeft: "auto" }}>Teams</span>
                                </Grid>
                                <Grid item sm={5} style={{textAlign: "right"}}>
                                    <Button onClick={() => this.handleTeamAddOpen()} style={{ marginLeft: "auto",}}>
                                        <AddCircle style={{ marginRight: 3 }} />Add New Team
                            </Button>
                                </Grid>
                                
                            </CardActions>
                            <CardContent style={{ backgroundColor: "#EEF1F1" }}>
                                {!this.props.team[0] && <br />}
                                {!this.props.team[0] && <br />}
                                {!this.props.team[0] &&
                                    <span className={classes.cardContent}>You have not added any teams.  If you want to spice up the competition within {this.props.organization.organization_name}, begin by adding a new team!</span>
                                }
                                {this.props.team[0] && <table className={classes.tableTeam}>
                                    <thead>
                                        <tr>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                            <th>Team Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teamList}
                                    </tbody>
                                </table>}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={3}>
                    </Grid>
                </Grid>

                <Modal
                    aria-labelledby="edit team"
                    aria-describedby="edit team"
                    className={classes.modal}
                    open={this.state.teamEditOpen}
                    onClose={this.handleClose}
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
                                    label="team name"
                                    className={classes.fieldLarge}
                                    value={this.state.teamName}
                                    onChange={this.handleChangeFor('teamName')}
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
                                <Button
                                    variant="contained"
                                    name="cancel"
                                    color="secondary"
                                    onClick={() => this.handleTeamClose()}
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

                <Modal
                    aria-labelledby="add team"
                    aria-describedby="add team"
                    className={classes.modal}
                    open={this.state.teamAddOpen}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <CardContent className={classes.form} style={{ backgroundColor: "#EEF1F1" }}>

                        {/* <h1 className={classes.h1} style={{ color: this.props.user.color }}>Enter Contest Details</h1> */}
                        <form onSubmit={this.handleTeamAdd}>
                            <div>
                                <TextField
                                    align="left"
                                    id="outlined-name"
                                    label="team name"
                                    className={classes.fieldLarge}
                                    value={this.state.teamName}
                                    onChange={this.handleChangeFor('teamName')}
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
                                <Button
                                    variant="contained"
                                    name="cancel"
                                    color="secondary"
                                    onClick={() => this.handleTeamClose()}
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

            </div>
        )

    }

}

const mapStateToProps = (reduxStore) => {
    return {
        user: reduxStore.user,
        team: reduxStore.teamSettings,
        organization: reduxStore.orgSettings,
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Teams));