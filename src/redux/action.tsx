import { singleItemType } from "../shared/types"

export const INITIALIZE = 'INITIALIZE'
export const UPDATEFONTSIZE = 'UPDATEFONTSIZE'
export const UPDATEFAV = 'UPDATEFAV'
export const ADDCUSTOM = 'ADDCUSTOM'
export const DELETEITEM = 'DELETEITEM'
export const SEARCHINPUT = 'SEARCHINPUT'
export const UPDATEDATA = 'UPDATEDATA'

export const initializeState = (data: singleItemType[]) => ({
  type: INITIALIZE,
  data,
});

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

export const searchInput = (value) => ({
    type: SEARCHINPUT,
    value,
})

export const updateData = (data) => ({
    type: UPDATEDATA,
    data,
})
