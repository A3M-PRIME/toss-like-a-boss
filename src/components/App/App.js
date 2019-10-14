import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import NavOrganizationAdmin from '../Nav/NavOrganizationAdmin';
import NavWasteWiseAdmin from '../Nav/NavWasteWiseAdmin';
import NavGuest from '../Nav/NavGuest';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import LoginPage from '../LoginPage/LoginPage';
import GameLaunch from "../GameLaunch/GameLaunch";
import Game from "../Game/Game";
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import Resources from '../Resources/Resources';
import Leaderboard from '../LeaderBoardCompany/LeaderBoardCompany';
import ResultsGuestPlayer from '../ResultsGuestPlayer/ResultsGuestPlayer';
import SettingsOrganization from '../SettingsOrganization/SettingsOrganization';
import SettingsAdmin from '../SettingsAdmin/SettingsAdmin';
import RegisterPage from '../RegisterPage/RegisterPage';


//Styling
import { ThemeProvider } from '@material-ui/styles';
import theme from '../Theme/Theme.js';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import 'typeface-roboto';
import HowToPlay from '../HowToPlay/HowToPlay';

import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <div>
              {/* <NavOrganizationAdmin />
              <NavWasteWiseAdmin /> */}
              <NavGuest />
              <Container>
                <Typography color="secondary">
                  <Switch>
                    {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
                    <Redirect exact from="/" to="/home" />
                    {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}

                    <Route exact path="/about" component={AboutPage} />
                    <Route exact path="/about" component={AboutPage} />
                    <Route
                      exact
                      path="/results"
                      component={ResultsGuestPlayer}
                    />
                    <Route exact path="/leaderboard" component={Leaderboard} />
                    {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
                    <ProtectedRoute exact path="/home" component={UserPage} />
                    {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
                    <Route exact path="/game" component={Game} />
                    <Route exact path="/gamelaunch" component={GameLaunch} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/howtoplay" component={HowToPlay} />
                    <Route exact path="/resources" component={Resources} />
                    <Route exact path="/settingsorg" component={SettingsOrganization} />

                    <ProtectedRoute
                      exact
                      path="/info"
                      component={InfoPage}
                    />
                    <ProtectedRoute
                      exact
                      path="/settingsorg"
                      component={SettingsOrganization}
                    />
                    <ProtectedRoute
                      exact
                      path="/settingsadmin"
                      component={SettingsAdmin}
                    />
                    <ProtectedRoute
                      exact
                      path="/leaderboard"
                      component={Leaderboard}
                    />

                    {/* If none of the other routes matched, we will show a 404. */}
                    <Route render={() => <h1>404</h1>} />
                  </Switch>
                </Typography>
              </Container>
            </div>
          </Router>
        </ThemeProvider>
      </DndProvider>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    reduxStore
  }
}

export default connect(mapStateToProps)(App);
