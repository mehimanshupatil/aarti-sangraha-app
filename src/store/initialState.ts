import { ColorSchemeName } from "react-native";
import { singleItemType } from "../shared/types";

export interface IState {
  aartis: singleItemType[];
  favorites: string[];
  fontSize: number;
  searchValue: string;
  isDarkMode: NonNullable<ColorSchemeName>;
}

const data: singleItemType[] = require("../shared/data.json");

const initialState: IState = {
  aartis: data.map((x) => ({ ...x, isRemovable: false })),
  favorites: [],
  fontSize: 20,
  searchValue: "",
  isDarkMode: "light",
};

export default initialState;
