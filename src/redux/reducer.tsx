import { INITIALIZE } from "./action"

const reducer = (state, action) => {
    switch (action.type) {
        case INITIALIZE:
            return { aartis: action.data, favorites: [], fontSize: 20 }

        default:
            return state
    }
}

export default reducer