import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* getLeaderboard(action) {
    console.log("client side leaderboard GET", action);
    try {
        let response = yield axios.get("api/score/leaderboard");
        console.log("saga response", response.data);
        yield put ({
            type: "SET_LEADERBOARD",
            payload: response.data
        });
    } catch (error) {
        console.log("error in client side leaderboard GET", error);
    }
}

function* watchMe() {
  yield takeEvery("FETCH_LEADERBOARD", getLeaderboard)
}

export default watchMe;