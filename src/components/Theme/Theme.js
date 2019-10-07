import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';

// Custom Theme for Trivia Weekend

const theme = createMuiTheme({
    overrides: {
        MuiFormLabel: {
            root: {
                "&$focused": {
                    color: '#55d685'
                }
            }
        }
    },
    palette: {
        primary: {
            main: '#55d685',
        },
        secondary: {
            main: '#nnn',
        },
        success: {
            main: '#55d685',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
        text: {
            default: '#fff',
        },
    },
});

export default (theme);