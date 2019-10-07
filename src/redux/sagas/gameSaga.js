import { put, takeEvery } from 'redux-saga/effects';
import axios from "axios"

function* addCorrectAnswer(action) {
    //TODO add correct answer to DB for item here
    try {
        //yield axios put... goes here
        //update game score reducer
        yield put ({
            type: 'UPDATE_GAME_SCORE'
        })
    }
    catch (error) {
        console.log('error with add correct answer saga', error);
    }
}

function* fetchGameItems(action) {
    try {
        const response = yield axios.get(`/api/item`)
        yield put ({
            type: 'SET_GAME_ITEMS',
            payload: response.data
        })
    }
    catch (error) {
        console.log('error with fetch game items', error);
    }
}

function* gameSaga() {
    yield takeEvery('ADD_CORRECT_ANSWER', addCorrectAnswer)
    yield takeEvery('FETCH_GAME_ITEMS', fetchGameItems)
}

export default gameSaga;