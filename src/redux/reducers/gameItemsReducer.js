const gameItemsReducer = (state = [{'id':0}], action) => {
    switch (action.type) {
        case 'SET_GAME_ITEMS':
            return action.payload;
        default:
            return state;
    }
}

export default gameItemsReducer;