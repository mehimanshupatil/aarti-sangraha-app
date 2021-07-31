import { singleItemType } from "../shared/types";
import * as types from "./types";

export interface IInitializeState {
  type: types.INITIALIZE;
  data: singleItemType[];
}
export interface IUpdateFontSize {
  type: types.UPDATEFONTSIZE;
  fontSize: number;
}
export interface IUpdateFav {
  type: types.UPDATEFAV;
  key: string;
  operation: "add" | "remove";
}
export interface IAddCustom {
  type: types.ADDCUSTOM;
  item: singleItemType;
}
export interface IDeleteItem {
  type: types.DELETEITEM;
  key: string;
}
export interface ISearchInput {
  type: types.SEARCHINPUT;
  value: string;
}
export interface IUpdateData {
  type: types.UPDATEDATA;
  data: singleItemType;
}

export interface IAddLocal {
  type: types.ADDLOCAL;
  data: singleItemType[];
}

export interface IDarkMode {
  type: types.ISDARK;
  data: boolean;
}

export const initializeState = (data: singleItemType[]): IInitializeState => ({
  type: types.INITIALIZE,
  data,
});

export const updateFontSize = (fontSize: number): IUpdateFontSize => ({
  type: types.UPDATEFONTSIZE,
  fontSize,
});

export const updateFav = (
  key: string,
  operation: "add" | "remove"
): IUpdateFav => ({
  type: types.UPDATEFAV,
  key,
  operation,
});

export const addCustom = (item: singleItemType): IAddCustom => ({
  type: types.ADDCUSTOM,
  item,
});

export const deleteItem = (key: string): IDeleteItem => ({
  type: types.DELETEITEM,
  key,
});

export const searchInput = (value: string): ISearchInput => ({
  type: types.SEARCHINPUT,
  value,
});

export const updateData = (data: singleItemType): IUpdateData => ({
  type: types.UPDATEDATA,
  data,
});

export const addLocal = (data: singleItemType[]): IAddLocal => ({
  type: types.ADDLOCAL,
  data,
});

export const changeDark = (data: boolean): IDarkMode => ({
  type: types.ISDARK,
  data,
});

export type TAction =
  | IInitializeState
  | IUpdateFontSize
  | IUpdateFav
  | IAddCustom
  | IDeleteItem
  | ISearchInput
  | IUpdateData
  | IAddLocal
  | IDarkMode;
