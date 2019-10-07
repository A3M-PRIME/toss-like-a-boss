const gameWrongAnswerReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_WRONG_ANSWER_ARRAY':
            return [...state, action.payload]
    }
}

export default gameWrongAnswerReducer;