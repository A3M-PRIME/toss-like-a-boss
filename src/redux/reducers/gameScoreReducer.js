const gameScoreReducer = (state = 0, action) => {
    switch (action.type) {
        case 'UPDATE_GAME_SCORE':
            return state + 1;
        default:
            return state;
    }
}

export default gameScoreReducer;