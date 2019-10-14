const organizationTeamNamesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TEAM_NAMES':
            return action.payload
        default:
            return state;
    }
}

export default organizationTeamNamesReducer;