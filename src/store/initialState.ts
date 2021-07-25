import { singleItemType } from "../shared/types";

export interface IState {
  aartis: singleItemType[];
  favorites: singleItemType[];
  fontSize: number;
  searchValue: string;
}

const data: singleItemType[] = require("../shared/data.json");

const initialState: IState = {
  aartis: data.map((x) => ({ ...x, isRemovable: false })),
  favorites: [],
  fontSize: 20,
  searchValue: "",
};

export default initialState;
