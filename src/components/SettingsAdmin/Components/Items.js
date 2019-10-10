import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Backdrop, Card, CardActions, CardContent, Fab, Grid, MenuItem, Modal, TextField } from "@material-ui/core";
import { Add, AddCircle, Edit, Cancel, Save, Delete, Remove } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// import ImageUpload from './ImageUpload';

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

class Items extends Component {

    state = {
        toggleAdd: false,
        itemName: '',
        receptacle: '',
        url: ''
    }

    componentDidMount() {
        this.getItems();
    }

    getItems() {
        this.props.dispatch({
            type: 'FETCH_ITEMS'
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

    handleItemAdd = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_ITEM',
            payload: this.state

        })
        this.setState({
            itemName: '',
            receptacle: '',
            url: ''
        })
    }

    render() {

        const { classes } = this.props

        return (
            <div>
                <span className={classes.addItem}>Add Item</span>
                <br/>
                {!this.state.toggleAdd ? <Fab color="primary" aria-label="add" style={{ marginTop: 15 }} onClick={this.handleAddClick}>
                    <Add />
                </Fab> :
                    <Fab color="secondary" aria-label="remove" style={{ marginTop: 15 }} onClick={this.handleAddClick}>
                        <Remove />
                    </Fab>
                }
                <br/><br/>
                {this.state.toggleAdd && <div>
                    <TextField
                        align="left"
                        id="outlined-name"
                        label="item name"
                        className={classes.fieldMedium}
                        value={this.state.itemName}
                        onChange={this.handleChangeFor('itemName')}
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
                        label="receptacle"
                        className={classes.fieldMedium}
                        value={this.state.receptacle}
                        onChange={this.handleChangeFor('receptacle')}
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
                        <MenuItem value="garbage">
                            Garbage
                        </MenuItem>
                        <MenuItem value="garbage">
                            Recycling
                        </MenuItem> 
                        <MenuItem value="garbage">
                            Compost
                        </MenuItem> 
                    </TextField>
                    <br/>
                    <TextField
                        align="left"
                        id="outlined-name"
                        label="image url"
                        className={classes.fieldLarge}
                        value={this.state.url}
                        onChange={this.handleChangeFor('url')}
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
                    {/* <ImageUpload/> */}
                    <br/><br/>
                    <Button className={classes.button} variant="contained" name="items" color="primary">Submit Item</Button>
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
        item: reduxStore.item
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Items));