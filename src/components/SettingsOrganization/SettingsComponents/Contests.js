import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Backdrop, Card, CardActions, CardContent, Grid, Modal, TextField } from "@material-ui/core";
import { AddCircle, Edit, Cancel, Save, Delete } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';