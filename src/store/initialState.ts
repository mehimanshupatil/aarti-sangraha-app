 
import { singleItemType } from "../shared/types";

export interface IState {
  aartis: singleItemType[];
  fontSize: number;
  searchValue: string; 
}

import data from "../shared/data.json";

const initialState: IState = {
  aartis: data.map((x) => ({ ...x, isRemovable: false, isFavorite: false })),
  fontSize: 20,
  searchValue: "", 
};

export default initialState;
