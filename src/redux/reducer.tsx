import { ADDCUSTOM, DELETEITEM, INITIALIZE, UPDATEFAV, UPDATEFONTSIZE } from "./action"

const reducer = (state, action) => {
    switch (action.type) {
        case INITIALIZE:
            return { aartis: action.data, favorites: [], fontSize: 20 }
        case UPDATEFONTSIZE:
            return { ...state, fontSize: action.fontSize }
        case UPDATEFAV:
            if (action.operation === 'add')
                return { ...state, aartis: state.aartis.map(x => x.key == action.item.key ? { ...action.item, favorite: true } : x) }
            else
                return { ...state, aartis: state.aartis.map(x => x.key == action.item.key ? { ...action.item, favorite: false } : x) }
        case ADDCUSTOM:
            return { ...state, aartis: [action.item, ...state.aartis] }
        case DELETEITEM:
            return { ...state, aartis: state.aartis.filter(x => x.key != action.key) }
        default:
            return state
    }
}

export default reducer