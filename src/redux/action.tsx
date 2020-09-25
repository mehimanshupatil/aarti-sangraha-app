import { exp } from "react-native-reanimated"

export const INITIALIZE = 'INITIALIZE'
export const UPDATEFONTSIZE = 'UPDATEFONTSIZE'
export const UPDATEFAV = 'UPDATEFAV'
export const ADDCUSTOM = 'ADDCUSTOM'
export const DELETEITEM = 'DELETEITEM'
export const SHOWHIDESEARCH = 'SHOWHIDESEARCH'

export const initializeState = (data) => ({
    type: INITIALIZE,
    data
})

export const updateFontSize = (fontSize) => ({
    type: UPDATEFONTSIZE,
    fontSize
})

export const updateFav = (item, operation) => ({
    type: UPDATEFAV,
    item,
    operation
})

export const addCustom = (item) => ({
    type: ADDCUSTOM,
    item,
})

export const deleteItem = (key) => ({
    type: DELETEITEM,
    key,
})

export const ShowHideSearchBar = (value) => ({
    type: SHOWHIDESEARCH,
    value,
})