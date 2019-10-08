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

function* updateOrganizationName(action) {
    try {
        let response = yield axios.put('/api/organization/organizationName', action.payload);
        console.log('Organization name update saga response:', action.payload);
        yield put({
            type: 'FETCH_ORGANIZATION',
            payload: response.data
        })
    } catch (err) {
        console.log('error in ORGANIZATION NAME PUT', err);
    }
}

function* orgSettingsSaga() {
    yield takeEvery('FETCH_ORGANIZATION', fetchOrganization);
    yield takeEvery('UPDATE_ORGANIZATION_NAME', updateOrganizationName);
}

export default orgSettingsSaga;