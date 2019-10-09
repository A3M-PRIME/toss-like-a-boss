import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Backdrop, Card, CardActions, CardContent, Grid, Modal, TextField } from "@material-ui/core";
import { Edit, Cancel, Save, Delete } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

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
        open: false
    }

    componentDidMount() {
        this.getTeams();
    }

    getTeams() {
        this.props.dispatch({
            type: 'FETCH_TEAMS'
        })
    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value
        });
    }

    handleOpen = (name, id) => {
        this.setState({
            open: !this.state.open,
            teamName: name,
            teamNameId: id
        })
    };

    handleClose = () => {
        this.setState({
            open: !this.state.open
        })
    };

    handleEdit = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'UPDATE_TEAM',
            payload: this.state

        })
        this.handleClose();
    }

    handleDelete = (id) => {
        console.log('deleting this id', id)
    }

    render() {

        const { classes } = this.props

        let teamList = this.props.team.map(team => {
            return (
                <tr>
                    <td className={classes.cardContentIconsLeft}>
                        <Button onClick={() => this.handleOpen(team.team_name, team.id)}>
                            <Edit />
                        </Button>
                    </td>
                    <td className={classes.cardContentIcons}>
                        <Button onClick={() => this.handleDelete(team.id)}>
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
                            <CardContent>
                                <span className={classes.cardHeader}>Teams</span>
                                {!this.props.team[0] && <br />}
                                {!this.props.team[0] && <br />}
                                {!this.props.team[0] &&
                                    <span className={classes.cardContent}>You have not added any teams.  If you want to spice up the competition among your organization, begin by adding a new team!</span>
                                }
                                <br /><br />
                                <table className={classes.tableTeam}>
                                    <tbody>
                                        {teamList}
                                    </tbody>
                                </table>
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
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <CardContent className={classes.form}>

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
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Teams));