import { put, takeEvery } from 'redux-saga/effects';
import axios from "axios";

function* fetchOrganization(action) {
    try {
        let response = yield axios.get('/api/organization')
        console.log('Saga response:', response.data)
        yield put ({
            type: 'SET_ORGANIZATION',
            payload: response.data[0]
        })
    } catch (err) {
        console.log('error in GET', err);
    }
}

function* orgSettingsSaga() {
    yield takeEvery('FETCH_ORGANIZATION', fetchOrganization);
}

export default orgSettingsSaga;