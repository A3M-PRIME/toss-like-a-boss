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

function* addItem(action) {
    try {
        let response = yield axios.post('/api/item/admin', action.payload)
        console.log('Add item saga response:', action.payload);
        yield put({
            type: 'FETCH_ITEMS',
            payload: response.data
        })
    } catch (err) {
        console.log('error in ADD ITEM POST', err);
    }
}

function* deleteItem(action) {
    try {
        let response = yield axios.delete(`/api/item/admin/${action.payload}`)
        console.log('Delete item saga response:', action.payload);
        yield put({
            type: 'FETCH_ITEMS',
            payload: response.data
        })
    } catch (err) {
        console.log('error in ITEM DELETE', err);
    }
}

function* itemSaga() {
    yield takeEvery('FETCH_ITEMS', fetchItems);
    yield takeEvery('ADD_ITEM', addItem);
    yield takeEvery('DELETE_ITEM', deleteItem);
}

export default itemSaga;