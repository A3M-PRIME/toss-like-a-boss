import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Backdrop, Card, CardActions, CardContent, Fab, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Modal, Radio, RadioGroup, TextField } from "@material-ui/core";
import { Add, AddCircle, Edit, Cancel, Save, Delete, Remove } from '@material-ui/icons';
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
        fontWeight: 'bold',
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
    cardContentUsers: {
        fontSize: 20,
        paddingLeft: 8,
        textAlign: 'center'
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
    addItem: {
        fontSize: 24,
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

class Users extends Component {

    state = {
        toggleAdd: false,
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        this.props.dispatch({
            type: 'FETCH_WASTE_WISE_USERS'
        })
    }

    handleAddClick = () => {
        this.setState({
            toggleAdd: !this.state.toggleAdd
        })
    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value
        });
    }

    handleUserAdd = () => {
        this.props.dispatch({
            type: 'ADD_WASTE_WISE_USER',
            payload: this.state

        })
        this.setState({
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
        })
    }

    render() {

        const { classes } = this.props

        let userList = this.props.admin.map(user => {
            return (
                <tr>
                    <td className={classes.cardContentIconsLeft}>
                        <Button onClick={() => this.handleUserEditOpen(user.first_name, user.last_name, user.username)}>
                            <Edit />
                        </Button>
                    </td>
                    <td className={classes.cardContentIcons}>
                        <Button onClick={() => this.handleDelete(user.first_name, user.id)}>
                            <Delete />
                        </Button>
                    </td>
                    <td className={classes.cardContentItems}>
                        {user.first_name}
                    </td>
                    <td className={classes.cardContentItems}>
                        {user.last_name}
                    </td>
                    <td className={classes.cardContentItems}>
                        {user.username}
                    </td>
                </tr>
            )
        })

        return (
            <div>
                <span className={classes.addItem}>Add Waste Wise Admin User</span>
                <br />
                {!this.state.toggleAdd ? <Fab color="primary" aria-label="add" style={{ marginTop: 15 }} onClick={this.handleAddClick}>
                    <Add />
                </Fab> :
                    <Fab color="secondary" aria-label="remove" style={{ marginTop: 15 }} onClick={this.handleAddClick}>
                        <Remove />
                    </Fab>
                }
                <br /> <br />
                {this.state.toggleAdd && <div>
                    <TextField
                        align="left"
                        id="outlined-name"
                        label="first name"
                        className={classes.fieldMedium}
                        value={this.state.firstName}
                        onChange={this.handleChangeFor('firstName')}
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
                        label="last name"
                        className={classes.fieldMedium}
                        value={this.state.lastName}
                        onChange={this.handleChangeFor('lastName')}
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
                    <br />
                    <TextField
                        align="left"
                        id="outlined-name"
                        label="email address"
                        className={classes.fieldLarge}
                        value={this.state.username}
                        onChange={this.handleChangeFor('username')}
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
                    <br />
                    <TextField
                        type="password"
                        align="left"
                        id="outlined-name"
                        label="password"
                        className={classes.fieldMedium}
                        value={this.state.password}
                        onChange={this.handleChangeFor('password')}
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
                        type="password"
                        align="left"
                        id="outlined-name"
                        label="confirm password"
                        className={classes.fieldMedium}
                        value={this.state.confirmPassword}
                        onChange={this.handleChangeFor('confirmPassword')}
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
                    <br /><br />
                    <Button className={classes.button} onClick={() => this.handleUserAdd()}
                        variant="contained" name="items" color="primary">Submit User</Button>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        user: reduxStore.user,
        team: reduxStore.teamSettings,
        organization: reduxStore.orgSettings,
        item: reduxStore.item,
        admin: reduxStore.wasteWiseAdminUsers
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Users));