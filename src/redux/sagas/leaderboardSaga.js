import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* getLeaderboard(action) {
  console.log("client side leaderboard GET", action);
  try {
    console.log('get leaderboard console log', action.payload)
    let response = yield axios.get(`api/score/leaderboard/${action.payload}`);
    console.log("saga response", response.data);
    yield put({
      type: "SET_LEADERBOARD",
      payload: response.data
    });
  } catch (error) {
    console.log("error in client side leaderboard GET", error);
  }
}

function* sendContestGameData(action) {
  console.log('contest data payload', action.payload)
  try {
    yield axios.post(`api/score`, action.payload);
  } catch (error) {
    console.log('error in send contest game data POST', error);
  }
}

function* getCompanyId(action) {
  try {
    let response = yield axios.get(`api/score/leaderboard/company/${action.payload}`);
    yield put({
      type: "SET_COMPANY_ID",
      payload: response.data
    });
  } catch (error) {
    console.log("error in client side leaderboard GET", error);
  }
}

function* watchMe() {
  yield takeEvery("FETCH_LEADERBOARD", getLeaderboard);
  yield takeEvery('SEND_CONTEST_GAME_DATA', sendContestGameData);
  yield takeEvery('GET_COMPANY_ID', getCompanyId);
}

export default watchMe;
