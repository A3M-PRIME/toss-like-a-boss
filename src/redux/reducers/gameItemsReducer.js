const gameItemsReducer = (state = ['name': ''], action) => {
    switch (action.type) {
        case 'SET_GAME_ITEMS':
            return action.payload;
        default:
            return state;
    }
}

export default gameItemsReducer;