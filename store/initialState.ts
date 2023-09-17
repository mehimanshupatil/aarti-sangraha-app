 
import { singleItemType } from "../shared/types";
import data from "./data.json";

export interface IState {
  aartis: singleItemType[];
  fontSize: number;
  searchValue: string; 
}


const initialState: IState = {
  aartis: data.map((x) => ({ ...x, isRemovable: false, isFavorite: false })),
  fontSize: 20,
  searchValue: "", 
};

export default initialState;
