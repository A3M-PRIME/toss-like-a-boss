import { put, takeEvery } from 'redux-saga/effects';

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

function* gameSaga() {
    yield takeEvery('ADD_CORRECT_ANSWER', addCorrectAnswer)
}

export default gameSaga;