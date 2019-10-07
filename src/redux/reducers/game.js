const game = (state = 0, action) => {
    switch (action.type) {
        case 'ADD_CORRECT_ANSWER':
            return action.payload;
        default:
            return state;
    }
}

export default game;