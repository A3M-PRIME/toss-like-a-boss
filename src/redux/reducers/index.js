import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import gameScoreReducer from './gameScoreReducer';
import gameWrongAnswerReducer from './gameWrongAnswerReducer';
import leaderboardReducer from './leaderboardReducer';
import gameItemsReducer from './gameItemsReducer';
import orgSettings from './orgSettingsReducer';
import teamSettings from './teamSettingsReducer';
import contestSettings from './contestSettingsReducer';
import compostBinReducer from './compostBinReducer';
import currentGameValueReducer from './currentGameValueReducer';
import item from './itemReducer';
import gameTimeReducer from './gameTimeReducer';
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  gameScoreReducer, //will have score of game
  gameWrongAnswerReducer, //array of wrong answers
  leaderboardReducer, //list of scores to display for organization leaderboard
  gameItemsReducer, //has list of items for game
  orgSettings, //has data for the organization admin to edit on settings page
  teamSettings, //has list of teams that belong to the organization on the organization's settings page
  contestSettings, //has list of contests that belong to the organization on the organization's settings page
  compostBinReducer, //stores whether player has compost bin or not
  currentGameValueReducer, //stores value for knowing what index of game items array user is on
  item,
  gameTimeReducer, //stores value of timer after game ends
});

export default rootReducer;
