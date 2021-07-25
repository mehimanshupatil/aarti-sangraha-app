import { TAction } from "./actions";
import { IState } from "./initialState";
import * as types from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { singleItemType, StorageKey } from "../shared/types";

const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {
    case types.INITIALIZE:
      AsyncStorage.setItem(StorageKey.aartis, "");
      AsyncStorage.setItem(StorageKey.fontSize, "");
      return {
        aartis: action.data,
        favorites: [],
        fontSize: 20,
        searchValue: "",
      };
    case types.ADDLOCAL:
      return { ...state, aartis: [...state.aartis, ...action.data] };
    case types.UPDATEFONTSIZE:
      AsyncStorage.setItem(StorageKey.fontSize, action.fontSize.toString());
      return { ...state, fontSize: action.fontSize };
    case types.UPDATEFAV:
      const key = action.key;
      const item = state.aartis.find((x) => x.key === key);
      if (!item) return state;
      const updatedItem = {
        ...item,
        favorite: action.operation === "add" ? true : false,
      };
      if (updatedItem.isRemovable) {
        updateLocalAartiState(updatedItem);
      }
      return {
        ...state,
        aartis: state.aartis.map((x) => (x.key === key ? updatedItem : x)),
      };
    case types.ADDCUSTOM:
      addLocalAartiState(action.item);
      return { ...state, aartis: [...state.aartis, action.item] };
    case types.DELETEITEM:
      removeLocalAartiState(action.key);
      return {
        ...state,
        aartis: state.aartis.filter((x) => x.key != action.key),
      };
    case types.SEARCHINPUT:
      return { ...state, searchValue: action.value };
    case types.UPDATEDATA:
      if (action.data.isRemovable) {
        updateLocalAartiState(action.data);
      }
      return {
        ...state,
        aartis: state.aartis.map((x) =>
          x.key == action.data.key ? action.data : x
        ),
      };
    default:
      return state;
  }
};

const updateLocalAartiState = (item: singleItemType) => {
  AsyncStorage.getItem(StorageKey.aartis).then((x) => {
    const parsed: singleItemType[] = x ? JSON.parse(x) : [item];
    const data = parsed.map((y) => (y.key === item.key ? item : y));
    AsyncStorage.setItem(StorageKey.aartis, JSON.stringify(data));
  });
};
const addLocalAartiState = (item: singleItemType) => {
  AsyncStorage.getItem(StorageKey.aartis).then((x) => {
    const parsed: singleItemType[] = x ? [...JSON.parse(x), item] : [item];
    AsyncStorage.setItem(StorageKey.aartis, JSON.stringify(parsed));
  });
};
const removeLocalAartiState = (key: string) => {
  AsyncStorage.getItem(StorageKey.aartis).then((x) => {
    const parsed: singleItemType[] = x ? JSON.parse(x) : [];
    AsyncStorage.setItem(
      StorageKey.aartis,
      JSON.stringify(parsed.filter((x) => x.key !== key))
    );
  });
};
export default reducer;
