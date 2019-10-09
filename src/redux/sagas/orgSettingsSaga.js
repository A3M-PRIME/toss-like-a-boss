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
        console.log('error in ORGANIZATION GET', err);
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

function* fetchTeams(action) {
    try {
        let response = yield axios.get('/api/team')
        console.log('Saga response:', response.data)
        yield put({
            type: 'SET_TEAMS',
            payload: response.data
        })
    } catch (err) {
        console.log('error in TEAM GET', err);
    }
}

function* updateTeam(action) {
    try {
        let response = yield axios.put('/api/team/teamName', action.payload);
        console.log('Team name update saga response:', action.payload);
        yield put({
            type: 'FETCH_TEAMS',
            payload: response.data
        })
    } catch (err) {
        console.log('error in TEAM NAME PUT', err);
    }
}

function* deleteTeam(action) {
    try {
        let response = yield axios.delete(`/api/team/${action.payload}`)
        console.log('Delete team saga response:', action.payload);
        yield put({
            type: 'FETCH_TEAMS',
            payload: response.data
        })
    } catch (err) {
        console.log('error in TEAM DELETE', err);
    }
}

function* addTeam(action) {
    try {
        let response = yield axios.post('/api/team', action.payload)
        console.log('Add team saga response:', action.payload);
        yield put({
            type: 'FETCH_TEAMS',
            payload: response.data
        })
    } catch (err) {
        console.log('error in ADD TEAM POST', err);
    }
}

function* orgSettingsSaga() {
    yield takeEvery('FETCH_ORGANIZATION', fetchOrganization);
    yield takeEvery('UPDATE_ORGANIZATION_NAME', updateOrganizationName);
    yield takeEvery('FETCH_TEAMS', fetchTeams);
    yield takeEvery('UPDATE_TEAM', updateTeam);
    yield takeEvery('DELETE_TEAM', deleteTeam);
    yield takeEvery('ADD_TEAM', addTeam);
}

export default orgSettingsSaga;