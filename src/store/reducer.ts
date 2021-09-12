import { TAction } from "./actions";
import initialState, { IState } from "./initialState";
import * as types from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { singleItemType, StorageKey } from "../shared/types";

const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {
    case types.INITIALIZE:
      AsyncStorage.setItem(StorageKey.aartis, "");
      AsyncStorage.setItem(StorageKey.fontSize, "");
      AsyncStorage.setItem(StorageKey.favList, "[]");
      return initialState;
    case types.ADDLOCAL:
      return { ...state, aartis: [...state.aartis, ...action.data] };
    case types.UPDATEFONTSIZE:
      return { ...state, fontSize: action.fontSize };
    case types.ADDFAVLIST:
      return { ...state, favorites: action.favList };
    case types.UPDATEFAV:
      const key = action.key;
      const favList =
        action.operation === "add"
          ? [...state.favorites, key]
          : state.favorites.filter((x) => x !== key);
      AsyncStorage.setItem(StorageKey.favList, JSON.stringify(favList));
      return {
        ...state,
        favorites: favList,
      };
    case types.ADDCUSTOM:
      const aartiToAdd = {
        ...action.item,
        key: (state.aartis.length + 1).toString(),
      };
      addLocalAartiState(aartiToAdd);
      return {
        ...state,
        aartis: [...state.aartis, aartiToAdd],
      };
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
    case types.ISDARK:
      return {
        ...state,
        isDarkMode: action.data,
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
