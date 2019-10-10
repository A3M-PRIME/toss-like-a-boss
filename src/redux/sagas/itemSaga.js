import { put, takeEvery } from 'redux-saga/effects';
import axios from "axios";



function* itemSaga() {
    yield takeEvery('FETCH_ITEMS', fetchItems);
}

export default itemSaga;