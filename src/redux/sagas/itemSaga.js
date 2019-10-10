import { put, takeEvery } from 'redux-saga/effects';
import axios from "axios";

function* fetchItems(action) {
    try {
        let response = yield axios.get('/api/item/admin')
        console.log('Saga response:', response.data)
        yield put({
            type: 'SET_ITEMS',
            payload: response.data
        })
    } catch (err) {
        console.log('error in ITEM GET', err);
    }
}

function* itemSaga() {
    yield takeEvery('FETCH_ITEMS', fetchItems);
}

export default itemSaga;