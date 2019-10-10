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
    cardContentItems: {
        fontSize: 20,
        paddingLeft: 8,
        textAlign: 'center'
    },
    image: {
        height: 75,
        width: 75
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
    edit: {
        width: "10%"
    },
    delete: {
        width: "10%"
    },
    itemName: {
        width: "40%"
    },
    receptacle: {
        width: "20%"
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

        let itemList = this.props.item.map(item => {
            return (
                <tr>
                    <td className={classes.cardContentIconsLeft}>
                        <Button onClick={() => this.handleItemEditOpen(item.name, item.url, item.receptacle, item.item_text)}>
                            <Edit />
                        </Button>
                    </td>
                    <td className={classes.cardContentIcons}>
                        <Button onClick={() => this.handleDelete(item.item_name, item.id)}>
                            <Delete />
                        </Button>
                    </td>
                    <td className={classes.cardContentItems}>
                        {item.name}
                    </td>
                    <td className={classes.cardContentItems}>
                        {item.receptacle}
                    </td>
                    <td className={classes.cardContentItems}>
                        <img className={classes.image} src={item.url}/>
                    </td>
                </tr>
            )
        })

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
                <br/><br/>
                <Grid container spacing={4} justify="center">
                    <Grid item sm={2}>
                    </Grid>
                    <Grid item sm={8}>
                        <Card className={classes.card}>
                            <CardActions style={{ backgroundColor: "#EEF1F1" }}>
                                <Grid item sm={5}>
                                </Grid>
                                <Grid item sm={2}>
                                    <span className={classes.cardHeader} style={{ marginLeft: "auto" }}>Items</span>
                                </Grid>
                                <Grid item sm={5} style={{ textAlign: "right" }}>
                                </Grid>
                            </CardActions>
                            <CardContent style={{ backgroundColor: "#EEF1F1" }}>
                                {this.props.item[0] && <table className={classes.tableItem}>
                                    <thead>
                                        <tr>
                                            <th className={classes.edit}>Edit</th>
                                            <th className={classes.delete}>Delete</th>
                                            <th className={classes.itemName}>Item Name</th>
                                            <th className={classes.receptacle}>Receptacle</th>
                                            <th className={classes.image}>Image</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemList}
                                    </tbody>
                                </table>}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={2}>
                    </Grid>
                </Grid>
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