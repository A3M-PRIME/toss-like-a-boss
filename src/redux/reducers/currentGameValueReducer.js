const currentGameValueReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT_CURRENT_GAME_VALUE':
            return state + 1;
        default:
            return state;
    }
}

export default currentGameValueReducer;