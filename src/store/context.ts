import { createContext, Dispatch } from "react";
import { TAction } from "./actions";
import initialState, { IState } from "./initialState";
interface IContextProps {
  state: IState;
  dispatch: Dispatch<TAction>;
}

const Context = createContext<IContextProps>({
  dispatch: () => {
    // Dispatch initial value
  },
  state: initialState,
});
export default Context;
