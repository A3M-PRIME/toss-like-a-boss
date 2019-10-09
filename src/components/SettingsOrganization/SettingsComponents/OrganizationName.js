import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Card, CardActions, CardContent, Grid, TextField } from "@material-ui/core";
import { Edit, Cancel, Save } from '@material-ui/icons';
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
        fontSize: 24
    },
    h1: {
        textAlign: 'right'
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

class OrganizationName extends Component {

    state = {
        organizationNameEdit: false,
        organizationName: ''
    }

    componentDidMount() {
        this.getOrganization();
    }

    getOrganization() {
        this.props.dispatch({
            type: 'FETCH_ORGANIZATION'
        })
    }

    toggleOrganizationNameEdit = () => {
        this.setState({
            organizationName: this.props.organization.organization_name
        })
        this.setState({
            organizationNameEdit: !this.state.organizationNameEdit
        })
    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value
        });
    }

    handleOrganizationNameSave = () => {
        this.props.dispatch({
            type: 'UPDATE_ORGANIZATION_NAME',
            payload: this.state
        })
        this.toggleOrganizationNameEdit()
    }

    render() {

        const { classes } = this.props

        return (

            <Grid container spacing={4} justify="center">
                <Grid item sm={3}>
                </Grid>
                <Grid item sm={6}>
                    <Card className={classes.card}>
                        <CardContent style={{ backgroundColor: "#EEF1F1" }}>
                            <span className={classes.cardHeader}>Organization Name</span>
                            <br /><br />
                            <span className={classes.cardContent}>{this.props.organization.organization_name}</span>
                            {this.state.organizationNameEdit && <br />}
                            {this.state.organizationNameEdit && <br />}
                            {this.state.organizationNameEdit &&

                                <TextField
                                    align="left"
                                    id="outlined-name"
                                    label="organization name"
                                    className={classes.fieldLarge}
                                    value={this.state.organizationName}
                                    onChange={this.handleChangeFor('organizationName')}
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
                            }
                        </CardContent>
                        <CardActions style={{ backgroundColor: "#EEF1F1" }}>
                            {!this.state.organizationNameEdit &&
                                <Button color="secondary" onClick={this.toggleOrganizationNameEdit} style={{ marginRight: 20, marginLeft: 0 }}>
                                    <Edit style={{ marginRight: 3 }} />Edit
                         </Button>}
                            {this.state.organizationNameEdit &&
                                <Button color="secondary" onClick={this.toggleOrganizationNameEdit} style={{ marginRight: 20, marginLeft: 0 }}>
                                    <Cancel style={{ marginRight: 3 }} />Cancel
                         </Button>}
                            {this.state.organizationNameEdit &&
                                <Button onClick={this.handleOrganizationNameSave} style={{ marginLeft: "auto", marginRight: 0}}>
                                    <Save style={{ marginRight: 3 }} />Save
                            </Button>}
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item sm={3}>
                </Grid>
            </Grid>
        )

    }

}

const mapStateToProps = (reduxStore) => {
    return {
        user: reduxStore.user,
        organization: reduxStore.orgSettings,
    }
}
export default connect(mapStateToProps)(withStyles(styles)(OrganizationName));