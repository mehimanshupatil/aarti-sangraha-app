const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIALIZE':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]

        default:
            return state
    }
}

export default reducer