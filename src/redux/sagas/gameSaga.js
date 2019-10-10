import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* addCorrectAnswer(action) {
  //TODO add correct answer to DB for item here
  try {
    //yield axios put... goes here
    //update game score reducer
    yield put({
      type: "UPDATE_GAME_SCORE"
    });
  } catch (error) {
    console.log("error with add correct answer saga", error);
  }
}

function* addWrongAnswer(action) {
  try {
    yield put({
      type: "UPDATE_WRONG_ANSWER_ARRAY"
    });
  } catch (error) {
    console.log("error with add wrong answer saga", error);
  }
}

function* fetchGameItems(action) {
  try {
    const response = yield axios.get(`/api/item`);
    yield put({
      type: "SET_GAME_ITEMS",
      payload: response.data
    });
  } catch (error) {
    console.log("error with fetch game items", error);
  }
}

function* firstTryCorrect(action) {
  try {
    let response = yield axios.put(`/api/item/correct`, action.payload);
    yield put({
      type: "ADD_CORRECT_ANSWER"
    });
  } catch (error) {
    console.log("error with firstTryCorrect saga", error);
  }
}

function* firstTryIncorrect(action) {
  try {
    yield axios.put(`/api/item/incorrect`, action.payload);
  } catch (error) {
    console.log("error with firstTryIncorrect saga", error);
  }
}

function* gameSaga() {
  yield takeEvery("ADD_CORRECT_ANSWER", addCorrectAnswer);
  yield takeEvery("FETCH_GAME_ITEMS", fetchGameItems);
  yield takeEvery("ADD_WRONG_ANSWER", addWrongAnswer);
  yield takeEvery("FIRST_TRY_CORRECT", firstTryCorrect);
  yield takeEvery("FIRST_TRY_INCORRECT", firstTryIncorrect);
}

export default gameSaga;
